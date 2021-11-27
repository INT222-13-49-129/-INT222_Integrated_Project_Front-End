<template>
  <div class="flex divide-x-4 text-center">
    <div class="w-1/7 py-1 flex-shrink-0 text-right px-2">
      {{ request.requestid }}
    </div>
    <div class="flex-1 py-1">
      {{
        request.ingredientsreq
          ? request.ingredientsreq.ingredientsname
          : request.foodtypereq.typename
      }}
    </div>
    <div class="w-1/6 py-1">
      {{ request.ingredientsreq ? "Ingredients" : "Category" }}
    </div>
    <div class="w-1/7 py-1">{{ request.userid }}</div>
    <div class="w-1/5">
      <div v-if="!edit" class="py-1">
        {{ request.status }}
      </div>
      <div v-else class="bg-gray-100 h-full flex flex-col justify-center">
        <select
          v-model="changestatus.status"
          class="w-full focus:outline-none text-center bg-gray-100 pl-3.5"
        >
          <option v-for="rs in requestStatus" :key="rs" :value="rs">{{ rs }}</option>
        </select>
      </div>
    </div>
    <div
      class="w-1/7 py-1 flex-shrink-0 flex justify-center items-center text-gray-400 relative"
    >
      <i
        class="material-icons text-xl absolute left-8 cursor-pointer"
        @click="
          edit
            ? $parent.requestadd.requestid === request.requestid
              ? (($parent.add = false), ($parent.requestadd = {}))
              : ''
            : (($parent.add = true), ($parent.requestadd = request)),
            (edit = !edit)
        "
      >
        {{ edit ? "close" : "edit" }}
      </i>
      <i
        class="material-icons text-xl absolute right-8 cursor-pointer"
        @click="edit ? submitFrom() : deleterequest()"
      >
        {{ edit ? "save" : "delete" }}
      </i>
    </div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";

export default {
  props: {
    request: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      edit: false,
      status: this.request.status,
      changestatus: this.request,
      requestStatus: [],
    };
  },
  watch: {
    edit: function editchange() {
      this.changestatus.status = this.status;
    },
  },
  async mounted() {
    const statusponse = await AdminApi.requestStatus();
    this.requestStatus = statusponse.data;
  },
  methods: {
    async submitFrom() {
      try {
        const response = await AdminApi.changestatusRequest(
          this.request.requestid,
          this.changestatus
        );
        if (response.data) {
          this.status = this.request.status;
          this.edit = false;
        }
      } catch (err) {
        this.changestatus.status = this.status;
        if ([500, 400].includes(err.response?.status) || err.response === undefined) {
          alert("ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่");
        }
      }
    },
    async deleterequest() {
      try {
        if (
          confirm(`ต้องการลบคำขอ Id ${this.request.requestid} ใช่หรือไม่ ?
การลบคำขอจะทำให้ผู้ใช้ไม่สามารถเห็นคำขอนี้ได้อีก`)
        ) {
          const response = await AdminApi.deleteRequest(this.request.requestid);
          if (response.data.success) {
            location.reload();
          }
        } else {
          return;
        }
      } catch (err) {
        if ([500, 400].includes(err.response?.status) || err.response === undefined) {
          alert("ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่");
        }
      }
    },
  },
};
</script>
