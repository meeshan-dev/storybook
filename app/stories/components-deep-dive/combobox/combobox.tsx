import {
  autoUpdate,
  flip as flipMiddleware,
  hide as hideMiddleware,
  offset as offsetMiddleware,
  size as sizeMiddleware,
  useFloating,
} from '@floating-ui/react';
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons-react';
import React from 'react';
import { createPortal } from 'react-dom';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { InputGroup, InputGroupInput } from '~/components/ui/input-group';
import { useControlled } from '~/stories/hooks/use-controlled';

const stripDiacritics = (string: string) => {
  return string.normalize('NFD').replace(/\p{Diacritic}/gu, '');
};

type Value = {
  label: string;
  value: string | number;
};

export function Combobox({
  multiple,
  options,
  getOptionDisabled,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placeholder,
}: {
  multiple?: boolean;
  options: Value[];
  getOptionDisabled?: (option: Value) => boolean;
  value?: Value | Value[] | null;
  defaultValue?: Value | Value[] | null;
  onValueChange?: (value: Value | Value[] | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
}) {
  const inputId = React.useId();

  const [value, setValue] = useControlled({
    controlled: valueProp,
    defaultValue: defaultValue ?? (multiple ? [] : null),
    onChange: onValueChange,
  });

  const [inputValue, setInputValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputWrapperRef = React.useRef<HTMLDivElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);
  const focusedTagIndexRef = React.useRef<number | null>(null);

  const defaultHighlighted = -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);

  const [open, setOpen] = useControlled({
    controlled: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const floatingReturn = useFloating({
    open,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware({ mainAxis: 3 + 7 /* 7 is arrow height */ }),
      flipMiddleware(),
      sizeMiddleware({
        apply({ rects, elements }) {
          elements.floating.style.setProperty(
            '--reference-width',
            `${rects.reference.width}px`,
          );
        },
      }),
      hideMiddleware({ strategy: 'referenceHidden' }),
    ],
  });

  const [keepUnfiltered, setKeepUnfiltered] = React.useState(true);

  const inputValueIsSelectedValue =
    value && !Array.isArray(value) && inputValue === value.label;

  const inputValueToFilter =
    inputValueIsSelectedValue && keepUnfiltered ? '' : inputValue;

  const inputToSearch = stripDiacritics(inputValueToFilter.toLowerCase());

  const filteredOptions = open
    ? inputToSearch
      ? options.filter(
          (option) =>
            stripDiacritics(option.value.toString().toLowerCase()).indexOf(
              inputToSearch,
            ) > -1,
        )
      : options
    : [];

  const updateInputValue = (newValue: Value | null | Value[]) => {
    let newInputValue;

    if (Array.isArray(newValue)) {
      newInputValue = '';
    } else if (!newValue) {
      newInputValue = '';
    } else {
      const optionLabel = newValue.label;
      newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
    }

    setInputValue(newInputValue);
  };

  const getValidIndex = (
    diff: 'start' | 'end' | 'reset' | number,
    direction: 'next' | 'previous' = 'next',
  ) => {
    const maxIndex = filteredOptions.length - 1;

    if (diff === 'reset') {
      return defaultHighlighted;
    }

    if (diff === 'start') {
      return 0;
    }

    if (diff === 'end') {
      return maxIndex;
    }

    let newIndex = highlightedIndexRef.current + diff;

    if (newIndex < 0) {
      if (newIndex === -1) {
        newIndex = -1;
      }

      if (highlightedIndexRef.current === -1) {
        newIndex = -1;
      }

      if (highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
        newIndex = 0;
      }

      newIndex = maxIndex;
    }

    if (newIndex > maxIndex) {
      if (newIndex === maxIndex + 1) {
        newIndex = -1;
      }

      if (Math.abs(diff) > 1) {
        newIndex = maxIndex;
      }

      newIndex = 0;
    }

    if (
      !listboxRef.current ||
      newIndex < 0 ||
      newIndex >= filteredOptions.length
    ) {
      return -1;
    }

    let nextFocus = newIndex;

    while (true) {
      const option = listboxRef.current.querySelector(
        `[data-option-index="${nextFocus}"]`,
      );

      if (
        option &&
        option.hasAttribute('tabindex') &&
        option.getAttribute('aria-disabled') === 'false'
      ) {
        return nextFocus;
      }

      // The next option is disabled, move to the next element.
      // with looped index
      if (direction === 'next') {
        // The index is zero-based, which means that when nextFocus + 1 equals
        // filteredOptions.length, all remaining options are disabled. In this case, set
        // nextFocus to 0 and start checking from the beginning
        nextFocus = (nextFocus + 1) % filteredOptions.length;
      } else {
        nextFocus =
          (nextFocus - 1 + filteredOptions.length) % filteredOptions.length;
      }

      // We end up with initial index, that means we don't have available options.
      // All of them are disabled
      if (nextFocus === newIndex) {
        return -1;
      }
    }
  };

  const setHighlightedIndex = (
    index: number,
    reason: 'click' | 'keyboard' | 'auto',
  ) => {
    highlightedIndexRef.current = index;

    if (!inputRef.current) return;
    if (!listboxRef.current) return;

    // does the index exist?
    if (index === -1) {
      inputRef.current.removeAttribute('aria-activedescendant');
    } else {
      inputRef.current.setAttribute(
        'aria-activedescendant',
        `${inputId}-option-${index}`,
      );
    }

    const prev = listboxRef.current.querySelector(
      `[role="option"][data-focused="true"]`,
    ) as HTMLElement;

    if (prev) {
      delete prev.dataset.focused;
      delete prev.dataset.focusVisible;
    }

    const listboxNode = listboxRef.current;

    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }

    const option = listboxRef.current.querySelector(
      `[data-option-index="${index}"]`,
    ) as HTMLElement;

    if (!option) return;

    option.dataset.focused = 'true';

    if (reason === 'keyboard') {
      option.dataset.focusVisible = 'true';
    }

    if (
      listboxNode.scrollHeight > listboxNode.clientHeight &&
      reason !== 'click'
    ) {
      const element = option;

      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;

      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight + 4;
      } else if (element.offsetTop < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - 4;
      }
    }
  };

  const handleOpen = () => {
    if (open) return;

    setOpen(true);
    setKeepUnfiltered(true);
    handleClearTagFocus();

    if (multiple || filteredOptions.length === 0 || value === null) {
      setHighlightedIndex(getValidIndex('reset'), 'auto');
      return;
    }

    if (value && !Array.isArray(value) && filteredOptions.length) {
      const index = filteredOptions.findIndex(
        (option) => option.value === value.value,
      );

      if (index === -1) {
        setHighlightedIndex(getValidIndex('reset'), 'auto');
      } else {
        setHighlightedIndex(index, 'auto');
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    handleClearTagFocus();
  };

  const handleSelectNewValue = (
    selectedOption: Value,
    isCtrlKeyDown = false,
  ) => {
    let newValue: Value | Value[] = selectedOption;

    // when user clicks on same selected option more than once
    if (!multiple && value === newValue) return;

    if (multiple) {
      const newMultipleValue = Array.isArray(value) ? value.slice() : [];

      const itemIndex = newMultipleValue.findIndex(
        (valueItem) => selectedOption.value === valueItem.value,
      );

      if (itemIndex === -1) {
        newMultipleValue.push(selectedOption);
      } else {
        newMultipleValue.splice(itemIndex, 1);
      }

      newValue = newMultipleValue;
    }

    setValue(newValue);
    updateInputValue(newValue);

    if (multiple ? !isCtrlKeyDown : true) {
      handleClose();
    }
  };

  const handleClear = () => {
    inputRef.current?.focus();

    setInputValue('');

    const newValue = multiple ? [] : null;

    setValue(newValue);

    setHighlightedIndex(getValidIndex('reset'), 'auto');
  };

  const handleClearTagFocus = () => {
    if (!inputWrapperRef.current) throw new Error('Listbox ref is null');

    const focusedTag = inputWrapperRef.current.querySelector<HTMLElement>(
      `[data-tag-index][data-focused="true"]`,
    );

    if (focusedTag) {
      delete focusedTag.dataset.focused;
      focusedTagIndexRef.current = null;
    }
  };

  const onInputWrapperKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Backspace') {
      if (inputValue) {
        setHighlightedIndex(getValidIndex('reset'), 'auto');
      }

      if (!inputValue && focusedTagIndexRef.current === null) {
        if (multiple && Array.isArray(value) && value.length > 0) {
          const newValue = value.slice();
          newValue.pop();

          setValue(newValue);
        }
      }

      if (typeof focusedTagIndexRef.current === 'number') {
        if (multiple && Array.isArray(value) && value.length > 0) {
          const newValue = value.slice();
          newValue.splice(focusedTagIndexRef.current, 1);

          setValue(newValue);
          focusedTagIndexRef.current = null;
        }
      }

      return;
    }

    if (event.key === 'Escape') {
      // Avoid Opera to exit fullscreen mode.
      event.preventDefault();
      // Avoid the Modal to handle the event.
      event.stopPropagation();

      if (open) {
        handleClose();
      } else if (
        inputValue !== '' ||
        (Array.isArray(value) && value.length > 0)
      ) {
        handleClear();
      }

      return;
    }

    if (
      !open &&
      ['PageUp', 'PageDown', 'ArrowDown', 'ArrowUp'].includes(event.key)
    ) {
      event.preventDefault();
      handleOpen();
      return;
    }

    if (
      event.key === 'ArrowLeft' &&
      !inputValue &&
      Array.isArray(value) &&
      value.length > 0
    ) {
      if (!inputWrapperRef.current) throw new Error('Listbox ref is null');

      setOpen(false);

      const prev = inputWrapperRef.current.querySelector<HTMLElement>(
        `[data-tag-index][data-focused="true"]`,
      );

      if (prev?.getAttribute('data-tag-index') === '0') {
        return;
      }

      if (prev) {
        delete prev?.dataset.focused;
      }

      const tag = inputWrapperRef.current.querySelector<HTMLElement>(
        `[data-tag-index="${prev ? Number(prev.getAttribute('data-tag-index')) - 1 : value.length - 1}"]`,
      );

      if (!tag) return;

      tag.dataset.focused = 'true';
      focusedTagIndexRef.current = Number(tag.getAttribute('data-tag-index'));

      return;
    }

    if (
      event.key === 'ArrowRight' &&
      !inputValue &&
      Array.isArray(value) &&
      value.length > 0
    ) {
      if (!inputWrapperRef.current) throw new Error('Listbox ref is null');

      const prev = inputWrapperRef.current.querySelector<HTMLElement>(
        `[data-tag-index][data-focused="true"]`,
      );

      if (prev?.getAttribute('data-tag-index') === String(value.length - 1)) {
        delete prev.dataset.focused;
        return;
      }

      if (!prev) return;

      setOpen(false);
      delete prev?.dataset.focused;

      const tag = inputWrapperRef.current.querySelector<HTMLElement>(
        `[data-tag-index="${Number(prev.getAttribute('data-tag-index')) + 1}"]`,
      );

      if (!tag) return;

      tag.dataset.focused = 'true';
      focusedTagIndexRef.current = Number(tag.getAttribute('data-tag-index'));

      return;
    }

    if (!open) return;

    if (event.key === 'Home') {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex('start', 'next'), 'keyboard');
      return;
    }

    if (event.key === 'End') {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex('end', 'next'), 'keyboard');
      return;
    }

    if (event.key === 'PageUp') {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex(-5, 'previous'), 'keyboard');
      return;
    }

    if (event.key === 'PageDown') {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex(5, 'next'), 'keyboard');
      return;
    }

    if (event.key === 'ArrowDown') {
      // Prevent cursor move
      event.preventDefault();
      setHighlightedIndex(getValidIndex(1, 'next'), 'keyboard');
      return;
    }

    if (event.key === 'ArrowUp') {
      // Prevent cursor move
      event.preventDefault();
      setHighlightedIndex(getValidIndex(-1, 'next'), 'keyboard');
      return;
    }

    if (event.key === 'Enter') {
      // Avoid early form validation, let the end-users continue filling the form.
      event.preventDefault();

      if (highlightedIndexRef.current === -1) return;

      const option = filteredOptions[highlightedIndexRef.current];

      if (!option) return;

      const optionDisabled = getOptionDisabled
        ? getOptionDisabled(option)
        : false;

      if (optionDisabled) return;

      const isCtrlKeyDown = event.ctrlKey || event.metaKey;

      handleSelectNewValue(option, isCtrlKeyDown);

      return;
    }
  };

  const handleFocus = () => {
    handleOpen();
  };

  const handleBlur = () => {
    handleClose();
    updateInputValue(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    handleClearTagFocus();

    if (inputValue !== newValue) {
      setInputValue(newValue);
      setKeepUnfiltered(false);
    }

    if (newValue) handleOpen();
  };

  const handleOptionMouseEnter = (e: React.MouseEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex(index, 'click');
    }
  };

  const handleOptionClick = (e: React.MouseEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));

    if (!filteredOptions[index]) return;

    handleSelectNewValue(filteredOptions[index]);
  };

  const handleListBoxToggle = () => {
    inputRef.current?.focus();

    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const onInputWrapperMouseDown = (e: React.MouseEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      e.preventDefault();
    }

    if (
      (e.currentTarget === e.target || e.target instanceof HTMLInputElement) &&
      !open
    ) {
      handleListBoxToggle();
    }
  };

  const onClick = () => {
    if (!inputRef.current) return;

    inputRef.current.select();
  };

  const handleTagDelete = (index: number) => () => {
    if (!Array.isArray(value)) return;

    const newValue = value.slice();
    newValue.splice(index, 1);

    setValue(newValue);
  };

  const tags =
    Array.isArray(value) && value.length > 0
      ? value.map((option, index) => (
          <Badge
            data-tag-index={index}
            key={option.value}
            variant='secondary'
            className='data-focused:ring-ring/50 pr-0 data-focused:ring-[3px]'
          >
            <span className='select-none'>{option.label}</span>
            <button
              type='button'
              tabIndex={-1}
              aria-label={`Remove ${option.label}`}
              onClick={handleTagDelete(index)}
              className='hover:bg-foreground/10 flex size-4 items-center justify-center rounded-full outline-none'
            >
              <IconX size={12} />
            </button>
          </Badge>
        ))
      : null;

  const actions = (
    <div className='absolute top-0 right-2 flex h-full items-center'>
      {(Array.isArray(value) ? !!value.length : !!value) && (
        <Button
          type='button'
          variant='ghost'
          size='icon-xs'
          aria-label='Clear'
          tabIndex={-1}
          className=''
          onClick={handleClear}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <IconX />
        </Button>
      )}

      <Button
        variant='ghost'
        size='icon-xs'
        type='button'
        aria-label={open ? 'close' : 'open'}
        tabIndex={-1}
        className=''
        onClick={handleListBoxToggle}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <IconChevronDown />
      </Button>
    </div>
  );

  if (multiple && !Array.isArray(value))
    throw new Error(`Combobox, value must be an Array when multiple is true`);

  if (!multiple && Array.isArray(value))
    throw new Error(
      `Combobox, value must not be an Array when multiple is false`,
    );

  const listboxAvailable = open && filteredOptions.length > 0;

  return (
    <>
      <InputGroup
        ref={(node) => {
          floatingReturn.refs.setReference(node);
          inputWrapperRef.current = node;
        }}
        aria-owns={open ? `${inputId}-listbox` : undefined}
        onKeyDown={onInputWrapperKeyDown}
        onMouseDown={onInputWrapperMouseDown}
        className='relative h-auto min-h-9 flex-wrap gap-2 p-2 pr-14'
      >
        {tags}

        <InputGroupInput
          ref={inputRef}
          id={inputId}
          value={inputValue}
          onClick={onClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleInputChange}
          // if open then this is handled imperatively in setHighlightedIndex so don't let react override
          // only have an opinion about this when closed
          aria-activedescendant={open ? '' : undefined}
          aria-autocomplete='list'
          aria-controls={listboxAvailable ? `${inputId}-listbox` : undefined}
          aria-expanded={listboxAvailable}
          // Disable browser's suggestion that might overlap with the popup.
          // Handle autocomplete but not autofill.
          autoComplete='off'
          autoCapitalize='none'
          spellCheck='false'
          role='combobox'
          placeholder={placeholder}
          className='h-5 min-w-17.5 grow p-0 text-sm'
        />

        {actions}
      </InputGroup>

      {open &&
        createPortal(
          <div
            ref={floatingReturn.refs.setFloating}
            style={floatingReturn.floatingStyles}
            data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
            className='bg-background ring-foreground/10 z-50 w-(--reference-width) overflow-hidden rounded-md shadow-md ring-1 outline-none data-[hide=true]:hidden'
          >
            {filteredOptions.length === 0 ? null : (
              <ul
                ref={listboxRef}
                role='listbox'
                id={`${inputId}-listbox`}
                aria-labelledby={`${inputId}-label`}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                className='max-h-60 overflow-auto p-1 outline-none'
              >
                {filteredOptions.map((option, index) => {
                  const selected = (
                    Array.isArray(value) ? value : [value]
                  ).some(
                    (value2) => value2 != null && option.value === value2.value,
                  );
                  const disabled = getOptionDisabled
                    ? getOptionDisabled(option)
                    : false;

                  return (
                    <li
                      key={option.value}
                      tabIndex={-1}
                      role='option'
                      id={`${inputId}-option-${index}`}
                      onMouseEnter={handleOptionMouseEnter}
                      onClick={handleOptionClick}
                      aria-disabled={!!disabled}
                      aria-selected={selected}
                      data-option-index={index}
                      className='data-focused:bg-secondary flex gap-2 rounded-md px-3 py-2 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 *:[svg]:size-4'
                    >
                      <span className='grow'>{option.label}</span>
                      {selected ? <IconCheck /> : null}
                    </li>
                  );
                })}
              </ul>
            )}

            {filteredOptions.length === 0 ? (
              <li className='flex items-center justify-center px-3 py-2 text-sm outline-none *:[svg]:size-4'>
                No options
              </li>
            ) : null}
          </div>,
          globalThis?.document.body,
        )}
    </>
  );
}
