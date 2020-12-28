<header class="navbar">
    <div class="navbar-section">
        <slot name="left" />
    </div>
    <div class="navbar-center">
        <slot name="center" />
    </div>
    <div class="navbar-section">
        <slot name="right" />
    </div>
</header>

<style lang="scss">
    @import 'spectre.css/src/navbar';
</style>
