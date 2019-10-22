<template>
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
  <!-- <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul> -->
</template>

