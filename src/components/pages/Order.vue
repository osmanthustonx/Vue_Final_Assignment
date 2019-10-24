<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">Email</th>
          <th scope="col">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
          <th scope="col">修改訂單</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in orders" :key="index">
          <td>{{item.create_at | format}}</td>
          <td>{{item.user.email}}</td>
          <td>
            <p v-for="(pItem,pIndex) in item.products" :key="pIndex">{{pItem.product.title}} : {{pItem.qty}}{{pItem.product.unit}}</p>
          </td>
          <td>{{item.total | currency}}</td>
          <td>
            <p class="text-success" v-if="item.is_paid">已付款</p>
            <p class="text-secondary" v-else>尚未啟用</p>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" 
                @click="openModal">修改訂單</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 新增的 Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">訂單修改</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="isPay">是否付款</label>
                <input type="checkbox" id="isPay"
                  v-model="tempOrder.is_paid">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="message">留言內容</label>
                <textarea type="unit" class="form-control" id="message"
                  placeholder="請輸入留言內容" cols="30" rows="10"></textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>付款方式</label>
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="visa" v-model="payMethod" value="Visa">
                  <label class="form-check-label" for="visa">Visa</label>
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="credit" v-model="payMethod" value="Credit">
                  <label class="form-check-label" for="credit">Credit</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="modify">修改</button>
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
    return{
      orders:{},
      tempOrder:{},
      pagination:{},
      payMethod:"",
    }
  },
  methods:{
    getOrder(page = 1){ 
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true; 
      this.$http.get(api).then((response) => {
        vm.isLoading = false; 
        vm.orders = response.data.orders;
        // console.log(vm.orders)
        let obj = vm.orders[0].products;
        // console.log(obj[Object.keys(obj)[0]]);
        vm.pagination = response.data.pagination;
      });
    },
    openModal(item){
      this.tempOrder = Object.assign({},item);
      $('#orderModal').modal('show');
    },
    modify(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.isLoading = true; 
      this.$http.get(api).then((response) => {
        vm.isLoading = false; 
        vm.orders = response.data.orders;
        // console.log(vm.orders)
        let obj = vm.orders[0].products;
        // console.log(obj[Object.keys(obj)[0]]);
        vm.pagination = response.data.pagination;
      });
    }
  },
  created(){
    this.getOrder();
  }
}
</script>