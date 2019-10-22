<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" 
                @click="openModal(false, item)">編輯</button>
          </td>
        </tr>
        <tr>

        </tr>
      </tbody>
    </table>

    <!-- pagination -->
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}"
            @click.prevent="getProducts(pagination.current_page - 1)">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
            :class="{'active': pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}"
            @click.prevent="getProducts(pagination.current_page + 1)">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->

    <!-- Modal -->
    <!-- 新增的 Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新建優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" 
                v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>

            <div class="form-group">
              <label for="code">優惠碼</label>
              <input type="text" class="form-control" id="code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>

            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="text" class="form-control" id="due_date"
                v-model="tempCoupon.due_date"
                placeholder="請輸入到期日">
            </div>

            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input type="number" class="form-control" id="percent"
                v-model.number="tempCoupon.percent"
                placeholder="請輸入折扣百分比">
            </div>

            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠碼</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';


export default {
  data(){
    return {
      coupons:[],
      tempCoupon:{},
      isNew:false,
      isLoading:false,
    }
  },
  methods:{
    getCoupon(page = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
      })
    },
    openModal(isNew,item){
      if(isNew){
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({},item);
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    updateCoupon(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api,{ data: vm.tempCoupon}).then((response) => {
        console.log(response);
        if (response.data.success) {
          $("#couponModal").modal('hide');
          vm.getCoupon();
        } else {
          $("#couponModal").modal('hide');
          vm.getCoupon();
          this.$bus.$emit('message:push', '新增失敗', 'danger');
        }
      })
    }
  },
  created(){
    this.getCoupon();
  }
}
</script>