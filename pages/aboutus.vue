<template>
  <div class="mx-auto xl:w-336 w-11/12 h-auto pb-10 bg-white shadow-lg">
    <div>
      <div class="flex xl:flex-row flex-col xl:mx-32 justify-center text-base">
        <div class="flex-col justify-center mx-auto xl:w-1/2 w-11/12">
          <p class="text-3xl text-salmon xl:mt-40 ">CFAN </p>
          <p class="text-salmon mt-5">The system calculates calories from food ingredients <br> and assesses primary
            nutrition. </p>
          <p class="text-gray-800 mt-5 text-right">ระบบคำนวณแคลอรี่<br>จากส่วนผสมในอาหารและประเมินภาวะโภชนาการเบื่องต้น
          </p>
          <div class="flex flex-row justify-end w-full mx-full mt-10 xl:gap-x-10 gap-x-5 text-salmon text-lg">
            <a href="#more"
              class="px-12 py-2 rounded-sm flex justify-center border border-lightsalmon text-sm my-auto transition duration-300 ease-in-out transform hover:scale-110 group bg-white hover:bg-salmon hover:shadow-2xl hover:text-white shadow-xl">
              More
            </a>
            <a href="#member"
              class="px-12 py-2 rounded-sm flex justify-center border border-salmon text-sm text-white my-auto transition duration-300 ease-in-out transform hover:scale-110 group bg-lightsalmon hover:bg-salmon hover:shadow-2xl hover:text-white shadow-xl">
              Member
            </a>
          </div>
        </div>
        <div class="xl:w-1/2">
          <img class="xl:w-11/12 w-5/12 mx-auto" src="../assets/img/member/bg/1.svg" />
        </div>
      </div>
      <div id="more" class="flex xl:flex-row flex-col xl:mx-32 justify-center text-base xl:mt-28">
        <div class="xl:w-1/2 ">
          <img class="xl:w-11/12 w-5/12 mx-auto" src="../assets/img/member/bg/2.svg" />
        </div>
        <div class="xl:w-1/2 w-11/12 mx-auto">
          <p class="text-3xl text-salmon xl:mt-40 mt-5 ">CFAN </p>
          <p class="text-salmon mt-5">The system calculates calories from food ingredients <br> and assesses primary
            nutrition. </p>
          <div class="text-gray-800 mt-5 ">เป็นระบบเกี่ยวกับการจดบันทึกข้อมูลแคลอรี่จากการกินเฉพาะบุคคลในแต่ละวันซึ่ง
            ฟังก์ชั่นหลักจะอยู่ที่การช่วยคำนวณแคลอรี่ของอาหารให้ใกล้เคียงกับอาหารจานของคุณมากที่สุด
            โดยการถามถึงปริมาณวัตถุดิบในอาหารจานนั้นๆ และ บันทึกแคลอรี่ที่ได้รับในแต่ละวัน โดยจะมีฟังก์ชั่นรองอื่นๆ เช่น
            ระบบช่วยประเมินความเหมาะสมของแคลอรี่ที่ควรได้รับในแต่ละวัน
          </div>
        </div>
      </div>

      <div id="member"
        class="flex xl:flex-row flex-col xl:mx-32 xl:mt-24 mt-16 mx-auto justify-center text-base text-gray-800 ">
        <div class="flex flex-row xl:w-9/12 w-11/12 m-auto">
          <div class="xl:w-6/12 w-9/12 mx-auto">
            <p class="text-3xl text-salmon ">MEMBER </p>
            <p class="text-3xl xl:mt-10 mt-5">{{member[now].name.split(" ")[0]+' '+member[now].name.split(" ")[1]}} <br class="xl:hidden">{{member[now].name.split(" ")[2]}}<br>{{member[now].id}}</p>
            <p class="xl:mt-10 mt-5">หน้าที่ :
            <div v-for="p in member[now].position" :key="p" >
            {{p}}
            </div>
            </p>
          </div>
          <div class="xl:w-6/12 w-3/12 my-auto">
            <img class="w-11/12 mx-auto" src="../assets/img/member/bg/3.svg" />
          </div>
        </div>
        <div class="flex">
          <div class="w-full flex xl:flex-col flex-row justify-around ">
            <img
              class="cursor-pointer xl:w-32 w-1/4 my-auto mx-5 xl:mb-5 rounded-full shadow-xl transform xl:hover:scale-125 hover:scale-110 transition duration-300 ease-in-out"
              :class="{'xl:scale-125 scale-110' : now === 0 }"
              src="../assets/img/member/kamin.png"
              @click="now=0" />
            <img
              class="cursor-pointer xl:w-32 w-1/4 my-5 xl:ml-16 rounded-full  shadow-xl transform xl:hover:scale-125 hover:scale-110 transition duration-300 ease-in-out"
              :class="{'xl:scale-125 scale-110' : now === 1 }"
              src="../assets/img/member/new.png"
              @click="now=1" />
            <img
              class="cursor-pointer xl:w-32 w-1/4 my-auto mx-5 xl:mt-5 rounded-full shadow-xl transform xl:hover:scale-125 hover:scale-110 transition duration-300 ease-in-outv"
              :class="{'xl:scale-125 scale-110' : now === 2 }"
              src="../assets/img/member/chompoo.jpg"
              @click="now=2" />
          </div>
        </div>
      </div>
      <div class="text-right xl:mx-32 mr-5 text-xs mt-20">
        <p>INT222 Information Technology Integrated Project II </p>
        <p>IT , SIT : King Mongkut’s University of Technology Thonburi</p>
        <p>2021</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        now:0,
        member: [
          {
            name: "นาย คามิน โต๊ะประดู่",
            id: "62130500013",
            position: ["Front-End", "Back-End", "Database"]
          },
          {
            name: "นาย ปฏิภาณ เทียนสุวรรณ",
            id: "62130500049",
            position: ["Network", "DevOps", "Database"]
          },
          {
            name: "นางสาว ปรียานุช บัวดำ",
            id: "62130500129",
            position: ["UxUi", "Front-End"]
          }
        ]
      }
    },

  }

</script>
