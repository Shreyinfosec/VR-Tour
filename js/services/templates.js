angular.module('nibbl').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/header.html',
    "<ul class=\"header-inner clearfix\"><li class=\"pull-left\"><ul class=\"top-menu\"><li class=\"waves-effect\"><a data-ui-sref=\"travel\" data-ng-click=\"mactrl.sidebarStat($event)\"><span class=\"tm-label\">Travel</span></a></li><li class=\"waves-effect\"><a data-ui-sref=\"explore\" data-ng-click=\"mactrl.sidebarStat($event)\"><span class=\"tm-label\">Explore</span></a></li></ul></li><li class=\"pull-right\"><ul class=\"top-menu\"><li><a data-ng-click=\"hctrl.fullScreen()\" href=\"\"><i class=\"tm-icon zmdi zmdi-fullscreen\"></i></a></li></ul></li></ul>"
  );

}]);
