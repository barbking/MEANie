var myApp=angular.module( 'myApp', [] );

myApp.controller( 'WhereMyPeeps', function( $http ){

  var vm = this;

  vm.addRecord = function(){
    var objectToSend ={
    name: vm.nameIn,
    location: vm.locationIn
    };//end of objec to send
      $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    });//end of post
    vm.nameIn ='';
    vm.locationIn='';
  };//end of addRecord function

  vm.getRecords = function(){
    $http({
    method: 'GET',
    url: '/getRecords',
    }).then( function success (response ){
      vm.allTheRecords = response.data;
      console.log( vm.allTheRecords );
    });
      // , function myError( response ){
    //   console.log( response.statusText );
    // });//end of get
  };//end of getRecords function

vm.deleteRecords = function(id){
  $http({
    method: 'DELETE',
    url: '/deleteRecords/'+id,
  }).then( function success (response ){
   vm.getRecords();
  });
};//end deleteRecords
});//end of contoller
