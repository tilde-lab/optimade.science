import JSONTreeView from 'json-tree-view';

interface Options {
    [key: string]: any;
}

function fire(el, name, detail) {
    const e = new CustomEvent(name, { detail });
    el.dispatchEvent(e);
}

const events = [
    'change',
    'rename',
    'delete',
    'append',
    'click',
    'expand',
    'collapse',
    'refresh'
];

export default function (node, { caption, value, ...options }: Options) {
    const view = new JSONTreeView(caption, value, null);

    console.log(caption, value, options);

    function update({ caption, value, expand = true, collapse = true, ...options }: Options) {
        view.expand(expand);

        Object.keys(options).forEach(key => {
            view[key] && (view[key] = options[key]);
        });

        if (view.value !== value) {
            view.value = value;
            view.refresh();
        }

        view.collapse(collapse);
    }

    events.forEach(eventName => {
        view.on(eventName, (self, key, ...changes) => {
            fire(node, eventName, { self, key, changes });
        });
    });

    update({ caption, value, ...options });

    node.appendChild(view.dom);

    return {
        update,
        destroy() {
            view.destroy();
        }
    };
}