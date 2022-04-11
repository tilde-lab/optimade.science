/* class should be prefixed with `float-{type}` */
export type Float = 'none' | 'left' | 'right';

/* class should be prefixed with `p-{type}` */
export type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | 'centered';

/* class should be postfixed with `{type}-1` or `{type}-2` */
export type Margin = 'm' | 'mt' | 'mx' | 'my' | false;
export type Padding = 'p' | 'pt' | 'px' | 'py' | false;
