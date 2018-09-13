//
//    eddLoginRegisterRedirectBack
//

 // adding redirect url state to session cache
 var $isRedirectNeeded = localStorage['eddLoginRegisterRedirectBack'] || 'No';

 // adding redirected  state to session cache
 var $isRedirected = localStorage['eddLoginRegisterRedirected'] || 'No';

 $( document ).on( "click", '#eddLoginRegisterRedirectBack ',function(event) {
        event.preventDefault();
        localStorage['eddLoginRegisterRedirectBack'] = window.location.href;
       window.location = $(this).attr("href");

  });



$(window).ready(function() {


//
//    eddLoginRegisterRedirectBack
//
if ($isRedirectNeeded != 'No') {

          var data = { action: 'is_user_logged_in' };
          var ajaxurl = location.protocol + "//" + location.host + "/wp-admin/admin-ajax.php";
          $.post(ajaxurl, data, function(response) {
              if(response == 'yes') {
                var redirectUrl = localStorage['eddLoginRegisterRedirectBack'];
                localStorage['eddLoginRegisterRedirectBack'] = 'No';
                localStorage['eddLoginRegisterRedirected'] = 'Yes';
                window.location = redirectUrl;
              }
          });

}

if ($isRedirected == 'Yes') {
// we want this message to be shown only once
  localStorage['eddLoginRegisterRedirected'] = 'No';

  // CSS style
  $myStyle= '<style>.eddRedirectTooltipText {color:white;margin-top:5px;padding:5px 10px 5px 10px;position: relative;background:#333;border: 4px solid #c2e1f5;display:block}.eddRedirectTooltipText:after, .eddRedirectTooltipText:before {bottom: 100%;left: 50%;border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}.eddRedirectTooltipText:after {border-color: rgba(97, 51, 68, 0);border-bottom-color: #613344;border-width: 10px;margin-left: -10px;}.eddRedirectTooltipText:before {border-color: rgba(194, 225, 245, 0);border-bottom-color: #c2e1f5;border-width: 16px;margin-left: -16px;}</style>';

  // Adding css style dynamically to head of html
  $('head').append($myStyle);

// notification message to be shown to user
var $notificationOnRedirect = 'Thanks for signing up! Click the download button to get your file';

  // adding tooltip to email input
  $( ".edd_purchase_submit_wrapper" ).after('<div class="eddRedirectTooltip"><span class="eddRedirectTooltipText">'+$notificationOnRedirect+'</span></div>');

 // adding tooltip to email input if user is not bought it
  $( ".edd-free-downloads-direct-download-link" ).after('<div class="eddRedirectTooltip"><span class="eddRedirectTooltipText">'+$notificationOnRedirect+'</span></div>');
 
}

  });
