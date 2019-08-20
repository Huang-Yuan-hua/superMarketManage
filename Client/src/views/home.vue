<template>
  <div class="home">
    <div class="container">
      <span class="text-3d">让每一笔收支清晰明了！</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("../assets/bgp.jpg") no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}

.text-3d {
  text-transform: uppercase;
  /* padding-bottom: 500px; */
  font-size: 30px;
  font-weight: 500px;
  letter-spacing: 8px;
  color: #eee;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 1px 0 rgb(190, 190, 190), 0 2px 0 rgb(185, 185, 185),
    0 3px 0 rgb(180, 180, 180), 0 4px 0 rgb(175, 175, 175),
    0 5px 0 rgb(170, 170, 170), 0 6px 0 rgb(165, 165, 165),
    0 7px 0 rgb(160, 160, 160), 0 1px 5px rgba(0, 0, 0, 0.05),
    0 3px 5px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.15),
    0 7px 10px rgba(0, 0, 0, 0.2), 0 10px 15px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
.text-3d:hover {
  text-shadow: 0 1px 0 rgb(190, 190, 190), 0 2px 0 rgb(185, 185, 185),
    0 3px 0 rgb(180, 180, 180), 0 4px 0 rgb(175, 175, 175),
    0 5px 0 rgb(170, 170, 170), 0 6px 0 rgb(165, 165, 165),
    0 7px 0 rgb(160, 160, 160), 0 8px 0 rgb(155, 155, 155),
    0 9px 0 rgb(150, 150, 150), 0 1px 5px rgba(0, 0, 0, 0.05),
    0 5px 5px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.15),
    0 15px 10px rgba(0, 0, 0, 0.2), 0 20px 15px rgba(0, 0, 0, 0.25);

  transform: translate(-51%, -51%);
  transition: all 0.3s ease-in-out;
}
</style>


