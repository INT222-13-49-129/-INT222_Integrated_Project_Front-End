<template>
  <div class="mx-auto md:w-336 w-11/12 h-auto pb-10 bg-gradient-to-b  from-white to-gray-200 shadow-lg">
   <div class="flex md:flex-row flex-col-reverse md:px-32 justify-center">
     <div class="md:w-5/12 w-11/12 flex flex-col justify-center mx-auto  md:pl-14 md:pr-0 px-6">
        <div class="text-salmon md:text-7xl text-5xl" >คำนวณ<br>
          แคลอรี่</div>
        <div class="mt-4 text-gray-800">หากร่างกายได้รับแคลอรี่มากกว่าที่เผาผลาญออกไป ทำให้น้ำหนักของเราเพิ่มขึ้น <br> แต่ถ้าเราเผาผลาญพลังงานออกไปมากกว่าที่ร่างกายได้รับเข้ามา จะทำให้น้ำหนักของเราลดลง</div>
     </div>
     <div class="md:w-7/12 w-full md:pl-12">
       <img  src="../assets/img/food-index.png" />
     </div>
   </div>
   <div class="flex md:flex-row flex-col justify-center w-3/4 mx-auto md:gap-x-10 gap-y-8 mt-6 md:mt-0 text-white text-lg">
      <nuxt-link class="transition duration-300 ease-in-out transform hover:scale-110 group bg-lightsalmon hover:bg-salmon hover:shadow-md px-5 py-2 rounded-full flex justify-center" to="/foodmenu">ค้นหาแคลอรี่ของอาหาร 
      <i class="material-icons text-xl ml-3">
        search
      </i></nuxt-link>
      <nuxt-link class="transition duration-300 ease-in-out transform hover:scale-110 group bg-lightsalmon hover:bg-salmon hover:shadow-md px-5 py-2 rounded-full flex justify-center" to="/">คำนวนแคลอรี่ใหม่
      <i class="material-icons text-xl ml-3">
        add
      </i></nuxt-link>
      <nuxt-link class="transition duration-300 ease-in-out transform hover:scale-110 group bg-lightsalmon hover:bg-salmon hover:shadow-md px-5 py-2 rounded-full flex justify-center" to="/">สมัครสมาชิก
      <i class="material-icons text-xl ml-3 group-hover:animate-bouncex">
        east
      </i></nuxt-link>
   </div>
  </div>
</template>
<script>
export default {}
</script>
