<template>
  <div>
    <Navbar/>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
          <Page></Page>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar  from './Navbar';
import Sidebar from './Sidebar';
import Alert   from './AlertMessage';
import Page    from './Pagination';
export default {
  components:{
    Navbar,
    Sidebar,
    Alert,
    Page,
  }
}
</script>