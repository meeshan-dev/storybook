import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDndMonitor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type Active,
  type DragEndEvent,
  type Over,
} from '@dnd-kit/core';
import { useState } from 'react';
import { create } from 'zustand';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

type ItemPriority = 'low' | 'medium' | 'high';

interface DndItem {
  id: string;
  name: string;
  type: 'component' | 'utility' | 'hook' | 'service';
  priority: ItemPriority;
  tags: string[];
  zoneId?: string;
}

const draggableItemsList: DndItem[] = [
  {
    id: '1',
    name: 'Button',
    type: 'component',
    priority: 'high',
    tags: ['ui', 'interactive'],
  },
  {
    id: '2',
    name: 'formatDate',
    type: 'utility',
    priority: 'medium',
    tags: ['date', 'formatter'],
  },
  {
    id: '3',
    name: 'useDebounce',
    type: 'hook',
    priority: 'high',
    tags: ['performance', 'react'],
  },
  {
    id: '4',
    name: 'ApiService',
    type: 'service',
    priority: 'high',
    tags: ['api', 'network'],
  },
  {
    id: '5',
    name: 'Modal',
    type: 'component',
    priority: 'medium',
    tags: ['ui', 'overlay'],
  },
  {
    id: '6',
    name: 'parseJSON',
    type: 'utility',
    priority: 'low',
    tags: ['parser'],
  },
  {
    id: '7',
    name: 'useLocalStorage',
    type: 'hook',
    priority: 'medium',
    tags: ['storage', 'react'],
  },
  {
    id: '8',
    name: 'AuthService',
    type: 'service',
    priority: 'high',
    tags: ['auth', 'security'],
  },
];

type DropZone = {
  id: string;
  name: string;
  acceptedTypes?: string[];
  maxCapacity?: number;
  minPriority?: ItemPriority;
  requiredTags?: string[];
  items: DndItem[];
};

// Initial drop zones with constraints
const dropZones: DropZone[] = [
  {
    id: 'zone-ui',
    name: 'UI Components Only',
    acceptedTypes: ['component'],
    maxCapacity: 3,
    items: [],
  },
  {
    id: 'zone-priority',
    name: 'High Priority Tasks',
    minPriority: 'high',
    maxCapacity: 4,
    items: [],
  },
  {
    id: 'zone-react',
    name: 'React Specific',
    requiredTags: ['react'],
    items: [],
  },
  {
    id: 'zone-unrestricted',
    name: 'Unrestricted Zone',
    items: [],
  },
];

const useStore = create<{
  items: DndItem[];
  zones: DropZone[];
  moveItem: (props: {
    fromZoneId?: string;
    toZoneId: string;
    item: DndItem;
  }) => void;
  resetItems: () => void;
}>((set) => ({
  items: draggableItemsList,
  zones: dropZones,
  moveItem: ({ fromZoneId, toZoneId, item }) => {
    set((state) => ({
      items: fromZoneId
        ? state.items
        : state.items.filter((ele) => ele.id !== item.id),
      zones: state.zones.map((zone) => {
        if (zone.id === fromZoneId) {
          return {
            ...zone,
            items: zone.items.filter((ele) => ele.id !== item.id),
          };
        }

        if (zone.id === toZoneId) {
          return {
            ...zone,
            items: [{ ...item, zoneId: zone.id }, ...zone.items],
          };
        }

        return zone;
      }),
    }));
  },
  resetItems: () => {
    set(() => ({
      items: draggableItemsList,
      zones: dropZones.map((zone) => ({ ...zone, items: [] })),
    }));
  },
}));

export function MultiConstraintDndDemo() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const moveItem = useStore((s) => s.moveItem);
  const resetItems = useStore((s) => s.resetItems);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeItem = active.data.current as DndItem;
    const zone = over?.data.current as DropZone | undefined;

    const status = getDropZoneStatus(over, active, zone!, []);

    if (status === 'valid' && zone) {
      moveItem({
        fromZoneId: activeItem.zoneId,
        toZoneId: zone.id,
        item: activeItem,
      });
    }
  };

  return (
    <section data-demo>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-semibold'>Available Items</h3>

          <Button variant='outline' size='xs' onClick={resetItems}>
            Reset
          </Button>
        </div>

        <InitialItems />

        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {dropZones.map((zone) => (
            <div key={zone.id} data-zone-id={zone.id} data-droppable='true'>
              <DroppableZone zone={zone} />
            </div>
          ))}
        </div>

        <ActiveItemOverlay />
      </DndContext>
    </section>
  );
}

function InitialItems() {
  const initialItems = useStore((s) => s.items);

  return (
    <div className='mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4'>
      {initialItems.length > 0 ? (
        initialItems.map((item) => <DraggableItem key={item.id} item={item} />)
      ) : (
        <p className='text-muted-foreground col-start-1 -col-end-1 my-3 text-center'>
          All items have been placed in drop zones. Use the reset button to
          start over.
        </p>
      )}
    </div>
  );
}

/* ———————————————————— Draggable Item ———————————————————— */

function DraggableItem({ item }: { item: DndItem; isOverlay?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: item,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      data-dragging={isDragging ? 'true' : undefined}
      className='group bg-background hover:border-ring relative flex cursor-grab items-center gap-2 rounded-lg border p-3 transition-colors data-dragging:opacity-50'
    >
      <div className='min-w-0 flex-1'>
        <div className='truncate text-sm font-medium'>{item.name}</div>
        <div className='text-xs text-gray-500 dark:text-gray-400'>
          {item.type}
        </div>
      </div>

      <Badge variant={item.priority === 'high' ? 'default' : 'secondary'}>
        {item.priority}
      </Badge>
    </div>
  );
}

/* ———————————————————— Droppable Zone ———————————————————— */

function DroppableZone({ zone }: { zone: DropZone }) {
  const { setNodeRef, over, active } = useDroppable({
    id: zone.id,
    data: zone,
  });

  const items = useStore(
    (s) => s.zones.find((z) => z.id === zone.id)?.items || [],
  );

  const status = getDropZoneStatus(over, active, zone, items);

  return (
    <div
      ref={setNodeRef}
      data-status={status}
      className='dark:data-[status=neutral]:border-border data-[status=neutral]:border-border flex h-60 flex-col rounded-lg border-2 border-red-600 py-4 transition-all duration-200 data-[status=valid]:border-green-600 dark:border-red-400 dark:data-[status=valid]:border-green-400'
    >
      <h3 className='px-4 text-sm font-semibold'>{zone.name}</h3>

      {items.length === 0 ? (
        <p className='text-muted-foreground grow content-center px-4 text-center text-sm'>
          Drop items here
        </p>
      ) : (
        <div className='scrollbar-thin mt-3 grow space-y-2 overflow-auto px-4'>
          {items.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ———————————————————— Active Item Overlay ———————————————————— */

function ActiveItemOverlay() {
  const [activeItem, setActiveItem] = useState<DndItem | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      const { active } = event;

      const item = active.data.current as DndItem;

      setActiveItem(item);
    },
    onDragEnd: () => {
      setActiveItem(null);
    },
  });

  return (
    <DragOverlay>
      {activeItem ? <DraggableItem item={activeItem} isOverlay /> : null}
    </DragOverlay>
  );
}

/* ———————————————————— Utils ———————————————————— */

const priorityOrder: Record<ItemPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

function getDropZoneStatus(
  over: Over | null,
  active: Active | null,
  zone: DropZone,
  zoneItems: DndItem[],
) {
  let status = 'neutral';

  if (over && over.id === zone.id && active) {
    const activeItem = active.data.current as DndItem;

    // Constraint checks
    if (zone.acceptedTypes && !zone.acceptedTypes.includes(activeItem.type)) {
      status = 'mismatch';
    } else if (zone.maxCapacity && zoneItems.length >= zone.maxCapacity) {
      status = 'full';
    } else if (
      zone.minPriority &&
      priorityOrder[activeItem.priority] < priorityOrder[zone.minPriority]
    ) {
      status = 'priority';
    } else if (
      zone.requiredTags &&
      !zone.requiredTags.every((tag) => activeItem.tags.includes(tag))
    ) {
      status = 'tags';
    } else {
      status = 'valid';
    }
  }

  return status;
}
