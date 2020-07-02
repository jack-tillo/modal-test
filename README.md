# modal-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## About

The Modal component can be placed anywhere in a page (e.g. close to the button that opens it) and does not require an EventBus to function.

To open and close a Modal, either update it's `value` prop to `true` or `false`, or `v-model` a boolean value to it.

### Template

Most basic setup:

```html
<modal v-model="open">Hello!</modal>
```

When you set `open` to `true`, the modal will render on the screen, over the top of all other content.

### Slots

There are 3 slots: `default`, `header`, and `footer`. The last two are optional.

```html
<modal>
    <template slot="header">This is the title</template>
    This is the body
    <template slot="footer">This is the footer</template>
</modal>
```

This mirrors the existing dialog design, the title goes in the `header` slot.

The main body (information, actions, inputs) goes in the `default` slot (required).

The action buttons go in the `footer` slot.

 The `footer` slot also has access to a `close` function via a scoped slot
 ```html
 <modal>
   <template slot="footer" slot-scope="{ close }">
     <button @click="close">Close</button>
   </template>
</modal>
```
This makes it easy to implement a compatible dialog-close button, if you disable `close-on-escape` and hide the default close button via `show-close`.

### Props

The props are simple:

- `value` = the boolean value describing whether the modal is open or not.
- `show-close` = if `false`, the X button beside the header will be hidden. Defaults to `true`.
- `close-on-escape` = if `false`, the modal will not close when the escape key is pressed. Defaults to `true`.

## Implementation detail

Every Modal instance registers itself upon mount with the global `modalManager` class instance. When a Modal instance is destroyed, it unregisters itself too.

The ModalManager holds a `Map` of instances and their keys. It can access the `$el` of each instance, as well as call their methods to update styles etc.

The main functionality of the ModalManager is handling cases where multiple Modals are open at once — and what happens when a new modal instance is opened while others are already open. It also handles closing only the top-most modal in a stack when the escape key is pressed.