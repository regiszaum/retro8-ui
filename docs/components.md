# Componentes e padroes HTML

## Button

Classes principais:

- `r8-btn`
- `r8-btn--primary`
- `r8-btn--secondary`
- `r8-btn--success`
- `r8-btn--danger`
- `r8-btn--ghost`

```html
<button class="r8-btn r8-btn--primary">Start</button>
```

## Input

Padrao recomendado:

```html
<label class="r8-field">
  <span class="r8-label">Name</span>
  <input class="r8-input" type="text" placeholder="Player 1" />
  <span class="r8-help">Use um identificador curto.</span>
</label>
```

## Panel

```html
<section class="r8-panel">
  <div class="r8-panel__header">
    <h2 class="r8-panel__title">Mission Log</h2>
  </div>
  <div class="r8-panel__body">...</div>
</section>
```

## Window

```html
<section class="r8-window">
  <div class="r8-window__titlebar">
    <span class="r8-window__title">Inventory</span>
  </div>
  <div class="r8-window__body">...</div>
</section>
```

## Badge

```html
<span class="r8-badge r8-badge--success">online</span>
```

## Dialog

Para semantica real, prefira `dialog` nativo:

```html
<dialog class="r8-dialog" open>
  <div class="r8-dialog__titlebar">
    <h2 class="r8-dialog__title">Exit game?</h2>
  </div>
  <div class="r8-dialog__body">Your progress will be lost.</div>
  <div class="r8-dialog__footer">
    <button class="r8-btn">Cancel</button>
    <button class="r8-btn r8-btn--danger">Exit</button>
  </div>
</dialog>
```

## Tabs visuais

A v1 entrega a estrutura visual. O controle de comportamento pode ser feito com HTML ou JS do projeto consumidor.

```html
<div class="r8-tabs">
  <div class="r8-tabs__list" role="tablist">
    <button class="r8-tabs__tab" role="tab" aria-selected="true">Stats</button>
    <button class="r8-tabs__tab" role="tab" aria-selected="false">Loot</button>
  </div>
  <div class="r8-tabs__panel" role="tabpanel">...</div>
</div>
```

## Progress bar

Use a custom property para definir o valor visual:

```html
<div class="r8-progress" style="--r8-progress-value: 72%">
  <div class="r8-progress__label">
    <span>Download</span>
    <span>72%</span>
  </div>
  <div class="r8-progress__track">
    <div class="r8-progress__bar"></div>
  </div>
</div>
```

## Navbar

```html
<nav class="r8-navbar">
  <a class="r8-navbar__brand" href="/">retro8-ui</a>
  <ul class="r8-navbar__menu">
    <li><a class="r8-navbar__item" href="#">Docs</a></li>
    <li><a class="r8-navbar__item" href="#">Examples</a></li>
  </ul>
</nav>
```
