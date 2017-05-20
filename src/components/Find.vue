<template>
  <div>
    <group>
      <cell title="兴趣圈" is-link link="/find"></cell>
      <cell title="话题排行" is-link></cell>
      <cell title="活动中心" is-link></cell>
    </group>

     <group>
      <cell title="动漫排行榜" is-link link="/find"></cell>
    </group>

   <group>
      <cell title="游戏中心" is-link link="/find"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'
export default {
  components: {
    Group,
    Cell
  }
}
</script>

