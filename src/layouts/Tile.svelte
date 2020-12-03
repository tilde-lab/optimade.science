<div class="tile">
    <div class="tile-icon">
        <slot name="icon" />
    </div>
    <div class="tile-content">
        <p class="tile-title">
            <slot name="title" />
        </p>
        <p class="tile-subtitle">
            <slot name="subtitle" />
        </p>
        <slot />
    </div>
    <div class="tile-action">
        <slot name="action" />
    </div>
</div>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/tiles';
</style>
