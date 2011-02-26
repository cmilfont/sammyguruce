_uacct = "UA-20244589-2"; 

try {
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', _uacct]);
  _gaq.push(['_trackPageview']);
  
   var pageTracker = _gat._getTracker(_uacct); 
   pageTracker._initData(); 
   pageTracker._trackPageview();	
} catch (e) {
	//aqui pode submeter via jquery para o servidor e logar os erros
	if(console) console.log(e.message);
}


var ativarMenu = function(route) {
  $('#menu li').removeClass('active');
  $('#menu li a[href*="'+route+'"]').parent().addClass("active");
};

var renderPage = function(route, callback) {
  ativarMenu(route);
  if(callback) callback.call(this);
};

;(function($) {

  var app = $.sammy('#corpo .container', function() {
    //this.use('GoogleAnalytics');
    this.use(Sammy.XTemplate);
    
    this.get('#!/home', function() {
      this.partial('views/home.html').then(function() {
      	renderPage("#!/home");
      });
    });
    
    this.get('#!/url', function() {
      this.partial('views/url.html').then(function() {
      	renderPage("#!/url");
      });
    });

    this.get('#!/tracking', function() {
      this.partial('views/tracking.html').then(function() {
      	renderPage("#!/tracking");
      });
    });
    
    this.get('#!/templates', function() {
      this.load('palestrantes', {cache: true, json:true})
          .partial('views/templates.html').then(function() {
            renderPage("#!/templates");
          });
    });

    this.get('#!/indexar', function() {
      this.partial('views/indexar.html').then(function() {
        renderPage("#!/indexar");
      });
    });
    
  });

  $(function() {
    app.run('#!/home');
  });
})(jQuery);