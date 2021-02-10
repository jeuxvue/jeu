<template>
  <div class="flex flex-wrap justify-center gap-4">
    <YoBlock title="buttons">
      <div class="flex gap-4">
        <YoButton type="primary">
          Primary
        </YoButton>
        <YoButton type="warning">
          Warning
        </YoButton>
        <YoButton type="danger">
          Danger
        </YoButton>
        <YoButton type="success">
          Success
        </YoButton>
      </div>
    </YoBlock>
    <YoBlock title="disabled buttons" content-class="flex gap-4">
      <YoButton disabled type="primary">
        Primary
      </YoButton>
      <YoButton disabled type="warning">
        Warning
      </YoButton>
      <YoButton disabled type="danger">
        Danger
      </YoButton>
      <YoButton disabled type="success">
        Success
      </YoButton>
    </YoBlock>
  </div>
</template>
