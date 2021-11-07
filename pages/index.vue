<template>
  <div class="mx-auto xl:w-336 w-11/12 h-auto pb-10 bg-gradient-to-b  from-white to-gray-200 shadow-lg">
   <div class="flex xl:flex-row flex-col-reverse xl:px-32 justify-center">
     <div class="xl:w-5/12 w-11/12 flex flex-col justify-center mx-auto  xl:pl-14 xl:pr-0 px-6">
        <h1 class="text-salmon xl:text-7xl text-5xl" >คำนวณ<br>
          แคลอรี่</h1>
        <div class="mt-4 text-gray-800">หากร่างกายได้รับแคลอรี่มากกว่าที่เผาผลาญออกไป ทำให้น้ำหนักของเราเพิ่มขึ้น <br> แต่ถ้าเราเผาผลาญพลังงานออกไปมากกว่าที่ร่างกายได้รับเข้ามา จะทำให้น้ำหนักของเราลดลง</div>
     </div>
     <div class="xl:w-7/12 w-full xl:pl-12">
       <img  src="../assets/img/food-index.png" />
     </div>
   </div>
   <div class="flex xl:flex-row flex-col justify-center w-3/4 mx-auto xl:gap-x-10 gap-y-8 mt-6 xl:mt-0 text-white text-lg">
      <nuxt-link class="transition duration-300 ease-in-out transform hover:scale-110 group bg-lightsalmon hover:bg-salmon hover:shadow-md px-5 py-2 rounded-full flex justify-center" to="/foodmenu">ค้นหาแคลอรี่ของอาหาร 
      <i class="material-icons text-xl ml-3">
        search
      </i></nuxt-link>
      <nuxt-link class="transition duration-300 ease-in-out transform hover:scale-110 group bg-lightsalmon hover:bg-salmon hover:shadow-md px-5 py-2 rounded-full flex justify-center" to="/newmenu">คำนวนแคลอรี่ใหม่
      <i class="material-icons text-xl ml-3">
        add
      </i></nuxt-link>
      <nuxt-link class="transition duration-300 ease-in-out transform hover:scale-110 group bg-lightsalmon hover:bg-salmon hover:shadow-md px-5 py-2 rounded-full flex justify-center" to="/signup">สมัครสมาชิก
      <i class="material-icons text-xl ml-3 group-hover:animate-bouncex">
        east
      </i></nuxt-link>
   </div>
  </div>
</template>
<script>
export default {}
</script>
