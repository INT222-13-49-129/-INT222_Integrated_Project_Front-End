<template>
    <div class="xl:w-336 w-11/12 pt-24 mx-auto xl:pt-16 bg-white shadow-lg">
        <div id="top"
            class="bgimge object-cover xl:w-full py-2 xl:h-28 mx-6 xl:mx-0 rounded-3xl xl:rounded-none"
        >
            <div class="flex xl:flex-row flex-col">
                <div class="text-white font-normal xl:pt-8 pt-4 pb-4 xl:ml-32 flex-shrink-0">
                    <div
                        class="xl:text-3xl text-2xl xl:text-right text-center"
                    >คำนวนแคลอรี่จานของคุณ</div>
                    <div class="text-base xl:text-right text-center">รังสรรค์ จานโปรด</div>
                </div>
            </div>
        </div>
        <div v-if="popup.show">
            <Modal classpop="flex flex-col text-center bg-white xl:w-128 w-11/12 rounded-xl fixed">
                <div v-if="popup.checkmark" class="my-6">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="24" fill="none" />
                        <path
                            class="checkmark__check"
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                    </svg>
                </div>
                <div v-if="popup.request">
                    <div class="text-center xl:text-xl text-lg">
                        ส่งคำขอของคุณเรียบร้อยแล้ว
                        <br class="xl:hidden" />โปรดรอการตรวจสอบ
                        <br />
                        <span class="xl:text-xl text-base">และสามารถติดตามผลพิจารณาได้ทางเว็บไซต์</span>
                    </div>
                    <div class="flex items-center justify-center mt-4 mb-6">
                        <div
                            class="px-3 py-1 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                            @click="clearpopup()"
                        >รับทราบ</div>
                    </div>
                </div>
                <div v-if="popup.foodmenu">
                    <div
                        class="xl:text-xl text-lg py-1"
                    >{{ edit ? 'แก้ไขรายการอาหารสำเร็จ' : 'เพิ่มไปยังรายการอาหารของฉันสำเร็จ' }}</div>
                    <div
                        class="py-5 px-2 mb-2 flex xl:flex-row flex-col-reverse items-center justify-center gap-x-6 gap-y-4"
                    >
                        <div
                            class="xl:w-4/12 w-9/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
                            @click="clearfoodmenu()"
                        >เพิ่มเมนูอีก</div>
                        <nuxt-link
                            to="/foodmenu"
                            class="xl:w-4/12 w-9/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                        >ไปยังรายการอาหาร</nuxt-link>
                    </div>
                </div>
                <div v-if="popup.alert">
                    <img src="../assets/img/alert.svg" class="my-6 mx-auto w-20" />
                </div>
                <div v-if="popup.deleterequest">
                    <div class="xl:text-xl text-lg py-1">
                        คำขอนี้ยังไม่ได้รับการตรวจสอบ
                        <br />
                        <span
                            class="xl:text-xl text-base"
                        >ท่านต้องการยืนยันที่จะลบคำขอนี้ ใช่หรือไม่?</span>
                    </div>
                    <div class="py-5 px-2 mb-2 flex items-center justify-center gap-x-6">
                        <div
                            class="xl:w-3/12 w-4/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
                            @click="clearpopup()"
                        >ยกเลิก</div>
                        <div
                            class="xl:w-3/12 w-4/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                            @click="deleterequest(deletereq, true)"
                        >ลบ</div>
                    </div>
                </div>
                <div v-if="popup.fail" class="flex flex-col items-center">
                    <div class="text-2xl">ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่</div>
                    <div
                        class="px-3 py-1 mt-6 mb-4 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                        @click="clearpopup()"
                    >ตกลง</div>
                </div>
            </Modal>
        </div>
        <div v-if="ingredientsSelected">
            <Modal classpop="flex flex-col text-center bg-white xl:w-128 w-10/12  fixed">
                <div
                    class="w-full bg-brightsalmon flex justify-center items-center text-white xl:text-2xl text-lg px-6 xl:py-6 py-4"
                >
                    <i
                        class="material-icons cursor-pointer xl:text-3xl text-2xl absolute xl:left-4 left-2"
                        @click="ingredientsSelected = null, ingredientsNum = 1"
                    >close</i>
                    <IngredientstypeSVG
                        :ingredient="ingredientsSelected.ingredientstype"
                        classingredient="xl:w-8 xl:h-8 w-6 h-6 mr-2"
                        fill="#FFFFFF"
                        class="flex justify-center items-center"
                    />
                    <span>{{ ingredientsSelected.ingredientsname }}</span>
                </div>
                <div class="w-full bg-white py-8 flex flex-col justify-center text-center">
                    <div class="xl:text-xl text-lg">
                        {{ ingredientsSelected.kcalpunit }} kcal. ต่อ
                        1 {{ ingredientsSelected.unit }}
                        <br />
                        โดยเท่ากับ {{ ingredientsSelected.descriptionunit }}
                    </div>
                    <div class="flex items-center justify-center xl:text-xl text-lg mt-4 mx-2">
                        <span class="flex-1 text-right xl:mr-4 mr-2">จำนวน</span>
                        <button
                            class="material-icons text-brightsalmon cursor-pointer"
                            @click="ingredientsNum > 1 ? ingredientsNum-- : ''"
                        >remove_circle_outline</button>
                        <input
                            id="ingredientsNum"
                            v-model="ingredientsNum"
                            type="number"
                            min="1"
                            step="1"
                            class="w-1/6 focus:outline-none text-center xl:text-2xl text-xl"
                        />
                        <button
                            class="material-icons text-brightsalmon cursor-pointer"
                            @click="ingredientsNum++"
                        >add_circle_outline</button>
                        <span class="flex-1 text-left xl:ml-4 ml-2">{{ ingredientsSelected.unit }}</span>
                    </div>
                    <div
                        class="rounded-2xl px-6 py-2 bg-green-300 mx-auto text-white mt-6 cursor-pointer xl:text-base text-sm hover:bg-green-400"
                        @click="ingredientsNum > 0 ? addingredients(ingredientsSelected, ingredientsNum) : ''"
                    >บันทึก</div>
                </div>
            </Modal>
        </div>
        <div v-if="sendrequestShow">
            <Modal classpop="flex justify-center items-center w-full h-full">
                <SendRequest
                    :ingredientstype="ingredientstypeArray"
                    :foodtype="sendrequestfoodtype"
                />
            </Modal>
        </div>
        <div v-if="ingredientsItemShow">
            <Modal classpop="flex justify-center items-center w-full h-full">
                <IngredientsItem :ingredients="ingredientsItem">
                    <i
                        class="material-icons cursor-pointer xl:text-3xl text-2xl absolute xl:left-4 left-2 xl:top-2 top-1 text-gray-400"
                        @click="ingredientsItemShow = false"
                    >close</i>
                </IngredientsItem>
            </Modal>
        </div>
        <div class="flex xl:flex-row flex-col w-full min-h-screen xl:py-6">
            <div class="xl:w-1/3 xl:border-r-4 flex flex-col xl:px-8 px-6 py-2 mt-2 xl:mt-0">
                <div class="flex justify-between items-center">
                    <div class="xl:text-2xl text-xl">{{ edit ? 'แก้ไขรายการอาหาร' : 'คำนวณใหม่' }}</div>
                    <div
                        class="text-gray-500 xl:text-base text-sm"
                    >ยอดรวม {{ newfoodmenu.totalkcal }} kcal.</div>
                </div>
                <div class="xl:mt-4 mt-2 text-base">
                    <label for="foodname">ชื่ออาหาร</label>
                    <br />
                    <input
                        id="foodname"
                        v-model.lazy.trim="newfoodmenu.foodname"
                        type="text"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-base text-sm"
                        placeholder="ชื่ออาหาร"
                        @change="validate.from ? '' : validateFrom()"
                    />
                    <div
                        v-if="!validate.foodname && !validate.from"
                        class="text-red-600 text-xs text-right mt-1"
                    >*{{ validatetext.foodname }}</div>
                </div>
                <div class="xl:mt-4 mt-2 text-base">
                    <label for="foodtype">ประเภทอาหาร</label>
                    <br />
                    <div class="flex">
                        <select
                            id="foodtype"
                            v-model="newfoodmenu.foodtype"
                            required
                            class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-base text-sm"
                            @change="validate.from ? '' : validateFrom()"
                        >
                            <option :value="null" disabled selected>ประเภทอาหาร</option>
                            <option
                                v-for="t in foodtypeArray"
                                :key="t.foodtypeid"
                                :value="t"
                            >{{ t.typename }}</option>
                        </select>
                        <div
                            v-if="isLoggedIn"
                            class="flex justify-center items-center w-8 h-8 ml-2 px-1 bg-gray-100 rounded-xl cursor-pointer"
                            @click="RequestShow(true, true)"
                        >
                            <i class="material-icons text-gray-400">add</i>
                        </div>
                    </div>
                    <div
                        v-if="!validate.foodtype && !validate.from"
                        class="text-red-600 text-xs text-right mt-1"
                    >*{{ validatetext.foodtype }}</div>
                </div>
                <div class="xl:mt-4 mt-2 text-base">
                    <label for="description">คำอธิบายอาหาร</label>
                    <br />
                    <textarea
                        id="description"
                        v-model.lazy.trim="newfoodmenu.description"
                        type="text"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-16 px-4 bg-gray-100 xl:text-base text-sm"
                        placeholder="คำอธิบาย"
                        @change="validate.from ? '' : validateFrom()"
                    ></textarea>
                    <div
                        v-if="!validate.description && !validate.from"
                        class="text-red-600 text-xs text-right"
                    >*{{ validatetext.description }}</div>
                </div>
                <div v-if="isLoggedIn" class="xl:mt-2 mt-0 text-base relative">
                    <label for="foodtype">ระดับการแชร์</label>
                    <br />
                    <select
                        id="foodtype"
                        v-model="newfoodmenu.foodmenustatus"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-base text-sm"
                    >
                        <option value="PERSONAL">&nbsp;&nbsp;ส่วนตัว</option>
                        <option value="PUBLISH">&nbsp;&nbsp;สาธารณะ</option>
                    </select>
                    <i
                        class="material-icons absolute xl:top-7 top-6 mt-0.5 left-3 xl:text-lg text-base text-brightsalmon"
                    >{{ newfoodmenu.foodmenustatus === 'PERSONAL' ? 'lock' : 'public' }}</i>
                </div>
                <div class="xl:mt-4 mt-2 text-base">
                    <div class="flex justify-between">
                        <div>วัตถุดิบ</div>
                        <div
                            class="text-gray-500 cursor-pointer underline"
                            :class="{ 'text-brightsalmon': '' === ingredientstype }"
                            @click="ingredientstypefilter('')"
                        >all</div>
                    </div>
                    <div class="flex justify-between mt-2 mb-1">
                        <div v-for="i in ingredientstypeArray" :key="i">
                            <div class="flex flex-col justify-center items-center xl:w-14 w-12">
                                <div
                                    class="rounded-full bg-gray-100 p-2 shadow-lg cursor-pointer"
                                    :class="{ 'shadow-inner': i === ingredientstype }"
                                    @click="ingredientstypefilter(i)"
                                >
                                    <IngredientstypeSVG
                                        :ingredient="i"
                                        classingredient="w-6 h-6"
                                        :fill="i === ingredientstype ? '#FCC090' : '#B4C1CC'"
                                        class="flex justify-center items-center"
                                    />
                                </div>
                                <div class="text-xs mt-2 text-gray-600">{{ i }}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="!validate.foodmenuHasIngredientsList && !validate.from"
                        class="text-red-600 text-xs text-right mt-1"
                    >*{{ validatetext.foodmenuHasIngredientsList }}</div>
                </div>
                <div class="xl:block hidden">
                    <div class="xl:mt-4 mt-2 flex gap-x-4">
                        <div class="relative text-gray-600 flex-grow flex filter drop-shadow-all">
                            <div class="flex justify-start">
                                <button
                                    type="submit"
                                    class="focus:outline-none absolute mt-1.5 ml-2"
                                    @click="searchfilter"
                                >
                                    <i class="material-icons text-gray-400">search</i>
                                </button>
                            </div>
                            <input
                                v-model.trim="searchInput"
                                class="rounded-xl w-full bg-white h-9 px-5 pl-10 text-sm focus:outline-none"
                                placeholder="ค้นหาวัตถุดิบ"
                                @keyup.enter="searchfilter"
                            />
                        </div>
                        <div
                            v-if="isLoggedIn"
                            class="flex justify-center items-center w-9 h-9 bg-white filter rounded-xl drop-shadow-all cursor-pointer"
                            @click="RequestShow(true)"
                        >
                            <i class="material-icons text-gray-400">add</i>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <div class="flex gap-x-4 text-gray-500">
                            <div
                                class="cursor-pointer"
                                :class="{ 'underline': !request }"
                                @click="request = false"
                            >ค้นหา</div>
                            <div
                                v-if="isLoggedIn"
                                class="cursor-pointer"
                                :class="{ 'underline': request }"
                                @click="getrequest(requestArray.length !== 0 ? requestArray.pageable.pageNumber : 0)"
                            >คำขอ</div>
                        </div>
                        <div>
                            <PageNumber
                                :page="request ? requestArray : ingredientsArray"
                                classnum="text-sm text-gray-500"
                            />
                        </div>
                    </div>
                    <div v-if="!request" class="flex flex-col mt-3 divide-y-2 border-t-2">
                        <div
                            v-for="ingredients in ingredientsArray.content"
                            :key="ingredients.ingredientsid"
                            class="py-2 flex items-center justify-between cursor-pointer hover:bg-salmon hover:bg-opacity-10"
                        >
                            <div
                                class="flex-grow"
                                @click="ingredientsSelected = ingredients, haveIngredients(ingredients) ? ingredientsNum = newfoodmenu.foodmenuHasIngredientsList[ingredientsIndex(ingredients)].totalunit : ''"
                            >
                                <Item
                                    :item="{
                                        name: ingredients.ingredientsname,
                                        description: `1 ${ingredients.unit}, ${ingredients.descriptionunit}`,
                                        totalkcal: ingredients.kcalpunit
                                    }"
                                >
                                    <IngredientstypeSVG
                                        :ingredient="ingredients.ingredientstype"
                                        classingredient="w-12 h-12 mr-2"
                                        fill="#FCC090"
                                        class="flex justify-center items-center"
                                    />
                                </Item>
                            </div>
                            <div
                                class="flex justify-center items-center w-9 h-9 bg-brightsalmon rounded-full mr-2 cursor-pointer hover:bg-salmon"
                                @click="haveIngredients(ingredients) ? addingredients(ingredients, newfoodmenu.foodmenuHasIngredientsList[ingredientsIndex(ingredients)].totalunit + 1) : addingredients(ingredients)"
                            >
                                <button class="material-icons text-white">add</button>
                            </div>
                        </div>
                        <div v-if="ingredientsArray.totalElements === 0" class="mx-6 mt-6">
                            <div class="xl:text-2xl  text-xl xl:my-2 my-3">No results found</div>
                            <div class="xl:text-lg text-base text-gray-600">
                                <p>Here are some hints:</p>
                                <ul class="list-disc ml-6 xl:text-base text-sm">
                                    <li>Make sure the spelling is correct.</li>
                                    <li>Use generic terms. Instead of specific brands, use their generic equivalent. For Example, instead of 'Pepsi'; use 'soda'</li>
                                    <li>If you continue to have problems, visit the Contact Us page to reach a customer support rep</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex flex-col mt-3 divide-y-2 border-t-2">
                        <div
                            v-for="r in requestArray.content"
                            :key="r.requestid"
                            class="py-2 flex items-center"
                        >
                            <RequestItem :request="r" />
                        </div>
                        <div
                            v-if="requestArray.totalElements === 0"
                            class="text-xl mt-6 text-center text-gray-500"
                        >ยังไม่มีคำขอ</div>
                    </div>
                </div>
                <div
                    v-if="ingredientsShow"
                    class="fixed z-30 inset-0 w-full h-full bg-white xl:hidden"
                >
                    <div class="w-full h-full relative overflow-y-scroll">
                        <div class="w-full h-32 bg-brightsalmon text-white text-2xl">
                            <div class="flex items-center pt-10 px-8 justify-center relative">
                                <i
                                    class="material-icons absolute cursor-pointer text-xl left-8"
                                    @click="ingredientsShow = false"
                                >arrow_back_ios</i>
                                <div>{{ ingredientstype === '' ? 'All ingredients' : ingredientstype }}</div>
                                <i
                                    v-if="isLoggedIn"
                                    class="material-icons absolute cursor-pointer right-8"
                                    @click="RequestShow(true)"
                                >add</i>
                            </div>
                        </div>
                        <div
                            class="relative text-gray-600 flex-grow flex filter drop-shadow-all px-10 -mt-6"
                        >
                            <div class="flex justify-start">
                                <button
                                    type="submit"
                                    class="focus:outline-none absolute mt-3 ml-3"
                                    @click="searchfilter"
                                >
                                    <i class="material-icons text-gray-400">search</i>
                                </button>
                            </div>
                            <input
                                v-model.trim="searchInput"
                                class="rounded-2xl w-full bg-white h-12 px-5 pl-10 text-base focus:outline-none"
                                placeholder="ค้นหาวัตถุดิบ"
                                @keyup.enter="searchfilter"
                            />
                        </div>
                        <div class="flex justify-between mt-4 px-8">
                            <div class="flex gap-x-4 text-gray-500">
                                <div
                                    :class="{ 'underline': !request }"
                                    @click="request = false"
                                >ค้นหา</div>
                                <div
                                    v-if="isLoggedIn"
                                    :class="{ 'underline': request }"
                                    @click="getrequest(requestArray.length !== 0 ? requestArray.pageable.pageNumber : 0)"
                                >คำขอ</div>
                            </div>
                            <div>
                                <PageNumber
                                    :page="request ? requestArray : ingredientsArray"
                                    classnum="text-sm text-gray-500"
                                />
                            </div>
                        </div>
                        <div
                            v-if="!request"
                            class="flex flex-col mt-3 divide-y-2 border-t-2"
                            :class="{ 'border-b-2': ingredientsArray.totalElements !== 0 }"
                        >
                            <div
                                v-for="ingredients in ingredientsArray.content"
                                :key="ingredients.ingredientsid"
                                class="py-2 flex items-center justify-center w-full"
                                @click="ingredientsSelected = ingredients, haveIngredients(ingredients) ? ingredientsNum = newfoodmenu.foodmenuHasIngredientsList[ingredientsIndex(ingredients)].totalunit : ''"
                            >
                                <Item
                                    :item="{
                                        name: ingredients.ingredientsname,
                                        description: `1 ${ingredients.unit}, ${ingredients.descriptionunit}`,
                                        totalkcal: ingredients.kcalpunit
                                    }"
                                    class="w-11/12"
                                >
                                    <IngredientstypeSVG
                                        :ingredient="ingredients.ingredientstype"
                                        classingredient="w-10 h-10 mr-2"
                                        fill="#FCC090"
                                        class="flex justify-center items-center"
                                    />
                                </Item>
                            </div>
                            <div v-if="ingredientsArray.totalElements === 0" class="mx-6 mt-4">
                                <div class="xl:text-2xl text-xl xl:my-2 my-3">No results found</div>
                                <div class="xl:text-lg text-base text-gray-600">
                                    <p>Here are some hints:</p>
                                    <ul class="list-disc ml-6 xl:text-base text-sm">
                                        <li>Make sure the spelling is correct.</li>
                                        <li>Use generic terms. Instead of specific brands, use their generic equivalent. For Example, instead of 'Pepsi'; use 'soda'</li>
                                        <li>If you continue to have problems, visit the Contact Us page to reach a customer support rep</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="flex flex-col mt-3 divide-y-2 border-t-2"
                            :class="{ 'border-b-2': requestArray.totalElements !== 0 }"
                        >
                            <div
                                v-for="r in requestArray.content"
                                :key="r.requestid"
                                class="py-2 flex items-center px-2"
                            >
                                <RequestItem :request="r" />
                            </div>
                            <div
                                v-if="requestArray.totalElements === 0"
                                class="text-xl mt-6 text-center text-gray-500"
                            >ยังไม่มีคำขอ</div>
                        </div>
                    </div>
                    <div
                        class="absolute flex items-center justify-center bottom-6 right-6 rounded-full bg-lightsalmon h-12 w-12 shadow-md cursor-pointer"
                        @click="foodmenuShow = true"
                    >
                        <div class="relative">
                            <i class="material-icons text-2xl text-white">restaurant_menu</i>
                            <div
                                class="h-6 w-6 flex items-center justify-center absolute -top-3 -right-5 bg-white text-sm rounded-full filter drop-shadow-all"
                            >{{ newfoodmenu.foodmenuHasIngredientsList.length }}</div>
                        </div>
                    </div>
                    <div v-if="foodmenuShow">
                        <div
                            class="fixed bg-opacity-20 bg-black flex z-40 inset-0 overflow-y-auto overflow-x-auto"
                        >
                            <div class="w-11/12 py-2 my-auto mx-auto">
                                <FoodmenuItem
                                    :foodmenu="newfoodmenu"
                                    :edit="true"
                                    class="xl:mt-10 mt-4 xl:w-11/12 w-full mx-auto shadow-lg"
                                >
                                    <template #top>
                                        <div
                                            class="absolute flex items-center top-1 left-2"
                                            @click="foodmenuShow = false"
                                        >
                                            <i class="material-icons text-xl text-gray-400">close</i>
                                        </div>
                                    </template>
                                    <template #footer>
                                        <div
                                            class="mt-4 text-right mr-2 text-lg"
                                        >แคลอรี่รวม {{ newfoodmenu.totalkcal }} kcal.</div>
                                    </template>
                                    <template #bottom>
                                        <div
                                            class="py-1 text-gray-700"
                                        >ประเภท : {{ newfoodmenu.foodtype ? newfoodmenu.foodtype.typename : '-' }}</div>
                                    </template>
                                </FoodmenuItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="xl:w-2/3 xl:px-8 px-6 py-2">
                <div class="xl:text-3xl text-lg">สรุปรายการ</div>
                <div>
                    <FoodmenuItem
                        :foodmenu="newfoodmenu"
                        :edit="true"
                        class="xl:mt-10 mt-4 xl:w-11/12 w-full mx-auto shadow-lg"
                    >
                        <template v-if="isLoggedIn" #top>
                            <div
                                class="absolute flex items-center xl:top-3 top-1 xl:right-4 right-2"
                            >
                                <i
                                    class="material-icons xl:text-lg text-base text-brightsalmon"
                                >{{ newfoodmenu.foodmenustatus === 'PERSONAL' ? 'lock' : 'public' }}</i>
                                <span
                                    class="ml-2 xl:text-base text-sm"
                                >{{ newfoodmenu.foodmenustatus === 'PERSONAL' ? 'ส่วนตัว' : 'สาธารณะ' }}</span>
                            </div>
                        </template>
                        <template #header>
                            <div>
                                <div class="flex items-center flex-col xl:flex-row">
                                    <div class="filter drop-shadow xl:ml-8 h-36 w-48  mt-4 xl:mt-0 items-center flex flex-shrink-0">
                                        <img
                                        :src="img"
                                        class="object-cover min-w-full min-h-full h-full"
                                    />
                                    </div>
                                    <div
                                        class="mt-3 flex items-center justify-center w-11/12 xl:justify-start mx-2 xl:mx-0 xl:hidden"
                                    >
                                        <label
                                            for="image"
                                            class="xl:ml-8 mr-1 xl:px-4 px-2 py-0.5 bg-white border-2 rounded-full xl:text-sm text-xs border-opacity-0 filter drop-shadow cursor-pointer flex-shrink-0"
                                        >อัพโหลดรูป</label>
                                        <div
                                            class="text-xs text-gray-500 truncate"
                                        >{{ newfoodmenu.image }}</div>
                                    </div>
                                    <div
                                        v-if="!validate.image && !validate.from"
                                        class="text-red-600 text-xs xl:hidden mt-1"
                                    >*{{ validatetext.image }}</div>
                                    <div
                                        class="flex flex-col items-start xl:ml-4 xl:gap-y-4 text-lg mt-4 xl:mt-0 w-full px-8 xl:px-0"
                                    >
                                        <div
                                            class="xl:text-base text-sm"
                                        >ประเภท : {{ newfoodmenu.foodtype ? newfoodmenu.foodtype.typename : '-' }}</div>
                                        <div class="xl:text-base text-sm text-left">
                                            คำอธิบาย :
                                            <br />
                                            {{ newfoodmenu.description ? newfoodmenu.description : '-' }}
                                        </div>
                                    </div>
                                    <div
                                        class="xl:text-lg text-base xl:mr-2 mt-2 xl:mt-0 flex-shrink-0 xl:ml-2"
                                    >แคลอรี่รวม {{ newfoodmenu.totalkcal }} kcal.</div>
                                </div>
                                <div
                                    class="mt-2 xl:flex items-center justify-center xl:justify-start mx-2 xl:mx-0 hidden"
                                >
                                    <label
                                        for="image"
                                        class="xl:ml-8 mr-1 xl:px-4 px-2 py-0.5 bg-white border-2 rounded-full xl:text-sm text-xs border-opacity-0 filter drop-shadow cursor-pointer flex-shrink-0"
                                    >อัพโหลดรูป</label>
                                    <input
                                        id="image"
                                        type="file"
                                        class="hidden"
                                        accept="image/*"
                                        @change="uploadImg"
                                    />
                                    <div
                                        class="text-xs text-gray-500 truncate"
                                    >{{ newfoodmenu.image }}</div>
                                </div>
                                <div
                                    v-if="!validate.image && !validate.from"
                                    class="text-red-600 text-xs text-left mt-1 xl:ml-8 xl:block hidden"
                                >*{{ validatetext.image }}</div>
                            </div>
                        </template>
                    </FoodmenuItem>
                </div>
                <div
                    v-if="!validate.all && !validate.from"
                    class="text-red-600 text-xs text-center mt-8 xl:-mb-6 -mb-4"
                >*{{ validatetext.all }}</div>
                <div
                    v-if="isLoggedIn"
                    class="flex flex-col xl:flex-row text-white xl:mt-12 mt-6 mb-6 xl:mb-0 justify-center gap-x-6 gap-y-4 xl:w-full w-11/12 mx-auto"
                >
                    <div
                        class="bg-salmon shadow-md px-5 py-2 rounded-full flex justify-center cursor-pointer"
                        @click="submitFrom()"
                    >
                        {{ edit ? 'ยืนยันการแก้ไขรายการอาหาร' : 'เพิ่มในรายการอาหารของฉัน' }}
                        <i
                            v-if="!edit"
                            class="material-icons text-xl ml-3"
                        >playlist_add</i>
                    </div>
                    <div
                        class="bg-salmon shadow-md px-5 py-2 rounded-full flex justify-center cursor-pointer"
                    >
                        แคลอรี่ที่เหมาะสมต่อวัน
                        <i class="material-icons text-xl ml-3">east</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as GeneralApi from '../utils/generalApi'
import * as UserApi from '../utils/userApi'
import Item from '../components/Item.vue';
import IngredientstypeSVG from '../components/IngredientstypeSVG.vue'
import PageNumber from '../components/PageNumber.vue';
import FoodmenuItem from '../components/FoodmenuItem.vue';
import RequestItem from '../components/RequestItem.vue';
import IngredientsItem from '../components/IngredientsItem.vue';
import Modal from '../components/Modal.vue';
import SendRequest from '../components/SendRequest.vue';

export default {
    components: {
        Item,
        IngredientstypeSVG,
        PageNumber,
        FoodmenuItem,
        RequestItem,
        IngredientsItem,
        Modal,
        SendRequest
    },
    async asyncData() {
        const foodtypesresponse = await GeneralApi.foodtypes()
        const foodtypeArray = foodtypesresponse.data

        const ingredientstyperesponse = await GeneralApi.ingredientsType()
        const ingredientstypeArray = ingredientstyperesponse.data

        const ingredientsresponse = await GeneralApi.ingredientsWithPage()
        const ingredientsArray = ingredientsresponse.data

        return { foodtypeArray, ingredientstypeArray, ingredientsArray }
    },
    data() {
        return {
            edit: false,
            editId: this.$route.query.edit,
            img: require("../assets/img/chooseimg.svg"),
            file: null,
            popup: {
                show: false,
                checkmark: false,
                request: false,
                alert: false,
                deleterequest: false,
                fail: false,
                foodmenu: false,
            },
            isLoggedIn: this.$auth.loggedIn,
            foodmenuShow: false,
            ingredientsShow: false,
            ingredientsItemShow: false,
            request: false,
            sendrequestShow: false,
            sendrequestfoodtype: false,
            deletereq: null,
            requestArray: [],
            ingredientsItem: null,
            ingredientsSelected: null,
            foodtypeArray: [],
            ingredientstypeArray: [],
            ingredientsArray: [],
            searchInput: "",
            search: "",
            ingredientstype: "",
            ingredientsNum: 1,
            newfoodmenu: {
                foodname: "",
                totalkcal: 0,
                image: "ยังไม่ได้เลือกรูป",
                description: "",
                foodmenustatus: "PERSONAL",
                foodtype: null,
                foodmenuHasIngredientsList: []
            },
            validate: {
                foodname: false,
                image: false,
                description: false,
                foodtype: false,
                foodmenuHasIngredientsList: false,
                all: false,
                from: true,
            },
            validatetext: {
                foodname: '',
                image: '',
                description: '',
                foodtype: '',
                foodmenuHasIngredientsList: '',
                all: ''
            }
        }
    },
    watch: {
        '$route.query.edit': function editIdCheck() {
            this.editId = this.$route.query.edit
            if (this.editId === undefined) {
                this.clearfoodmenu()
            } else {
                this.getFoodmenuEdit()
            }
        }
    },
    mounted() {
        this.getFoodmenuEdit()
    },
    methods: {
        async getFoodmenuEdit() {
            if (this.editId && this.isLoggedIn) {
                try {
                    const response = await UserApi.foodmenu(this.editId)
                    if (response.data) {
                        this.edit = true
                        this.newfoodmenu = response.data
                        const responseImg = await UserApi.foodmenuImg(this.editId)
                        this.img = responseImg
                    }
                } catch (err) {
                    this.$router.replace("/404/newmenu/" + this.editId)
                }
            } else {
                this.$router.replace("/newmenu")
            }
        },
        async submitFrom() {
            this.validateFrom()
            if (this.validate.from) {
                try {
                    let response
                    if (this.edit) {
                        response = await UserApi.updateFoodmenu(this.newfoodmenu, this.file)
                    } else {
                        response = await UserApi.createFoodmenu(this.newfoodmenu, this.file)
                    }
                    if (response.data) {
                        this.popup.show = true
                        this.popup.checkmark = true
                        this.popup.foodmenu = true
                    }
                } catch (err) {
                    this.validate.from = false
                    const status = err.response?.data?.status
                    if (status === 1002) {
                        this.validatetext.foodname = 'ชื่อเมนูอาหารซ้ำกับเมนูสาธารณะที่มีอยู่แล้ว'
                        this.validate.foodname = false
                    }
                    if (status === 1003) {
                        this.validatetext.foodname = 'ชื่อเมนูอาหารซ้ำกับเมนูส่วนตัวที่มีอยู่แล้ว'
                        this.validate.foodname = false
                    }
                    if (status === 2011) {
                        this.validatetext.all = 'ผู้ใช้ไม่สามารถเป็นค่าว่างได้หากเป็นเมนูส่วนตัว'
                        this.validate.all = false
                    }
                    if (status === 3002) {
                        this.validatetext.image = 'บันทึกรูปไม่สำเร็จกรุณาลองใหม่'
                        this.validate.image = false
                    }
                    if ([500, 400].includes(err.response?.status) || err.response === undefined) {
                        this.validatetext.all = 'ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่'
                        this.validate.all = false
                        this.popup.show = true
                        this.popup.alert = true
                        this.popup.fail = true
                    }
                }
            }
            document.getElementById('top').scrollIntoView({
                behavior: "smooth"
            });
        },
        validateFrom() {
            if (this.newfoodmenu.foodname === '') {
                this.validatetext.foodname = 'กรุณาใส่ชื่อเมนูอาหาร'
                this.validate.foodname = false
            } else if (this.newfoodmenu.foodname.length > 50) {
                this.validatetext.foodname = 'ชื่อเมนูอาหารห้ามยาวกว่า 50 ตัวอักษร'
                this.validate.foodname = false
            } else {
                this.validate.foodname = true
            }

            if (this.file === null && !this.edit) {
                this.validatetext.image = 'กรุณาใส่รูป'
                this.validate.image = false
            } else {
                this.validate.image = true
            }

            if (this.newfoodmenu.description === '') {
                this.validatetext.description = 'กรุณาใส่คำอธิบาย'
                this.validate.description = false
            } else if (this.newfoodmenu.description.length > 255) {
                this.validatetext.description = 'คำอธิบายห้ามยาวกว่า 255 ตัวอักษร'
                this.validate.description = false
            } else {
                this.validate.description = true
            }

            if (this.newfoodmenu.foodtype === null) {
                this.validatetext.foodtype = 'กรุณาเลือกประเภทอาหาร'
                this.validate.foodtype = false
            } else {
                this.validate.foodtype = true
            }

            if (this.newfoodmenu.foodmenuHasIngredientsList.length === 0) {
                this.validatetext.foodmenuHasIngredientsList = 'กรุณาเพิ่มวัตถุดิบ'
                this.validate.foodmenuHasIngredientsList = false
            } else {
                this.validate.foodmenuHasIngredientsList = true
            }

            this.validate.all = true
            this.validate.from = true
            Object.values(this.validate).forEach(v => {
                this.validate.from = v && this.validate.from
            });
        },
        changPage(n) {
            let pagenumber
            if (this.request) {
                pagenumber = this.requestArray.pageable.pageNumber + n
                this.getrequest(pagenumber)
            } else {
                pagenumber = this.ingredientsArray.pageable.pageNumber + n
                this.getingredient(pagenumber)
            }
        },
        async getrequest(pagenumber = 0) {
            const response = await UserApi.requestsWithPage(pagenumber)
            this.requestArray = response.data
            this.request = true
        },
        searchfilter() {
            this.search = encodeURIComponent(this.searchInput)
            this.getingredient();
        },
        ingredientstypefilter(ingredientstype) {
            this.ingredientsShow = true
            this.ingredientstype = ingredientstype
            this.getingredient();
        },
        async getingredient(pagenumber = 0) {
            this.searchInput = decodeURIComponent(this.search)
            const response = await GeneralApi.ingredientsWithPage(this.ingredientstype, this.search, pagenumber)
            this.ingredientsArray = response.data
            this.request = false
        },
        haveIngredients(ingredients) {
            return this.newfoodmenu.foodmenuHasIngredientsList.map(i => i.key.ingredientsIngredientsid).includes(ingredients.ingredientsid)
        },
        ingredientsIndex(ingredients) {
            return this.newfoodmenu.foodmenuHasIngredientsList.findIndex((i => i.key.ingredientsIngredientsid === ingredients.ingredientsid))
        },
        addingredients(ingredients, totalunit = 1) {
            if (totalunit < 1) {
                return
            }
            if (this.haveIngredients(ingredients)) {
                const index = this.ingredientsIndex(ingredients)
                this.newfoodmenu.foodmenuHasIngredientsList[index].totalunit = totalunit
                this.newfoodmenu.foodmenuHasIngredientsList[index].totalkcal = totalunit * ingredients.kcalpunit
            } else {
                this.newfoodmenu.foodmenuHasIngredientsList.push({
                    key: {
                        ingredientsIngredientsid: ingredients.ingredientsid
                    },
                    ingredients,
                    totalunit,
                    totalkcal: totalunit * ingredients.kcalpunit
                })
            }
            this.ingredientsSelected = null
            this.ingredientsNum = 1
            this.calculatetotalkcal()
        },
        deleteingredients(ingredients) {
            this.newfoodmenu.foodmenuHasIngredientsList = this.newfoodmenu.foodmenuHasIngredientsList.filter(i => i.key.ingredientsIngredientsid !== ingredients.ingredientsid)
            this.calculatetotalkcal()
        },
        calculatetotalkcal() {
            this.newfoodmenu.totalkcal = this.newfoodmenu.foodmenuHasIngredientsList.map(i => i.totalkcal).reduce((a, b) => a + b, 0)
            if (!this.validate.from) {
                this.validateFrom()
            }
        },
        uploadImg(event) {
            const file = event.target.files[0]
            if (this.isImage(file.name)) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.img = event.target.result;
                };
                reader.readAsDataURL(file);
                this.file = file
                this.newfoodmenu.image = file.name
                if (!this.validate.from) {
                    this.validateFrom()
                }
            } else if (this.file === null) {
                this.validatetext.image = 'กรุณาใส่เฉพาะไฟล์รูป'
                this.validate.image = false
            }

        },
        getExtension(filename) {
            const parts = filename.split('.');
            return parts[parts.length - 1];
        },
        isImage(filename) {
            const ext = this.getExtension(filename);
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'bmp':
                case 'png':
                case 'webp':
                    return true;
            }
            return false;
        },
        RequestShow(show, foodtype = false) {
            this.sendrequestShow = show
            this.sendrequestfoodtype = foodtype
        },
        requestadded() {
            this.RequestShow(false)
            this.getrequest()
            this.popup.show = true
            this.popup.checkmark = true
            this.popup.request = true
        },
        async deleterequest(request, wait = false) {
            if (request.status === 'WAIT' && !wait) {
                this.deletereq = request
                this.popup.show = true
                this.popup.alert = true
                this.popup.deleterequest = true
                return
            }

            try {
                const response = await UserApi.deleteRequest(request.requestid)
                if (response.data) {
                    this.getrequest()
                    this.clearpopup()
                }
            } catch (err) {
                this.popup.show = true
                this.popup.alert = true
                this.popup.fail = true
            }
        },
        clearfoodmenu() {
            this.$router.replace("/newmenu")
            Object.assign(this.$data, this.$options.data.apply(this))
        },
        clearpopup() {
            Object.keys(this.popup).forEach(i => { this.popup[i] = false })
        }
    }
}
</script>
<style>
.bgimge {
    background-image: url("../assets/img/bgfoodmenu.svg");
    background-position: center;
    background-size: 700px auto;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}

.checkmark {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: block;
    stroke-width: 3;
    stroke: #4bb71b;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #4bb71b;
    animation: fill 0.4s ease-in-out 0.4s forwards,
        scale 0.3s ease-in-out 0.9s both;
    position: relative;
    top: 5px;
    right: 5px;
    margin: 0 auto;
}
.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 3;
    stroke-miterlimit: 10;
    stroke: #4bb71b;
    fill: #fff;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes scale {
    0%,
    100% {
        transform: none;
    }

    50% {
        transform: scale3d(1.1, 1.1, 1);
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #4bb71b;
    }
}
</style>