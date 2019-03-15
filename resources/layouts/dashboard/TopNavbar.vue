<template>
  <nav id="page-header" class="navbar navbar-expand-lg"
       :class="{'bg-white': true, 'navbar-transparent': false}">
    <div class="container-fluid">

      <a class="navbar-brand" href="#">Learn2Drive</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="nav2">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/search">Suche</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/dashboard">Meine Fahrschule</nuxt-link>
          </li>
        </ul>
      </div>

      <div id="navbar" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/register">Registrieren</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login">Anmelden</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
