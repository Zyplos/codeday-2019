<template>
  <div>
    <nav
      class="navbar navbar-expand-lg fixed-top navbar-light bg-primary py-0 pr-0"
    >
      <a class="navbar-brand mr-auto mr-lg-0 p-0" href="#">GroupUp</a>
      <button
        class="navbar-toggler p-0 border-0"
        type="button"
        data-toggle="offcanvas"
        @click="toggleNavbar"
        v-bind:class="{ active: isActive }"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="navbar-collapse offcanvas-collapse"
        id="navbarsExampleDefault"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Dashboard
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Notifications</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Switch account</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdown01"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >Settings</a
            >
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleNavbar() {
      console.log("TOGGLE")
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 991.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 52px; /* Height of navbar */
    bottom: 0;
    left: 100%;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    visibility: hidden;
    background-color: $gray-200;
    transition: visibility 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out,
      -webkit-transform 0.3s ease-in-out;
  }
  .offcanvas-collapse.open {
    visibility: visible;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.navbar-toggler {
  height: 52px;
  background-color: rgba(0, 0, 0, 0.2);
  width: 52px;
}
</style>
