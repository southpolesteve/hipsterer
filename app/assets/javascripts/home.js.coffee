# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$ ->
  featureList = new List('friend-list', { page: 35, valueNames: ['name'] })
  # $('.result-name').each ->
  #   name = $(this).innerHTML
  #   $(this).next().load("/vinyl?name=" + escape(name))


  # $('ul.list a').tooltip()