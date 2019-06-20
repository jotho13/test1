
var unreadQFlag = true;
var unreadINTFlag = true;


$(function(){	

	$(document).ajaxStart(function() {
		$('body').addClass("loading");  
		
	    
	});
	$(document).ajaxStop(function() {
		$('body').removeClass("loading"); 
		
	  
	   
	});	
	
	
	
	if(window.location.pathname.toLowerCase() == '/platformadmin/contract-lookup.xhtml'){
		
		
	$('#not_CompanyList').multiselect({

includeSelectAllOption: true

});

	$('#stCalend input').datepicker({ 
			autoclose: true, 
			todayHighlight: true,
			forceParse: false,
			validateOnBlur: false
	  });
	  
	 $('#edCalend input').datepicker({
		 autoclose: true,
		 todayHighlight: true,
		 forceParse: false,
		 validateOnBlur: false
	 });

	$('#stCalend').on('click', function() {
		$('#stCalend input').datepicker("show");
	});

	$('#edCalend').on('click', function() {
		$('#edCalend input').datepicker("show");
	});



}


	
	
	$(document).ready(function() { 
	  loginName();
window.spasschange =false;
			 window.secques =false;
 var active=true;
  // if (typeof userName === "undefined") {
    
   // loginName();
// } 
   
 window.userName = loginName();
 addGoogleAnaliticsTag();
 

 
	/* Popup Message hide From Not Registered User*/ 	
		
	  if((userName == null) || (window.location.pathname.toLowerCase() == '/new-term-ack.xhtml') ){
		  $('.unread').remove();
	  }else{
		  $('.unread').show();
	  }
	  
	  /* Popup Message hide From Not Registered User*/ 	
	  
	  if($('.unread').length > 0){		
		 
		  
		  	 $.ajax({				   
					url: domainUrl+"user/getusermesg/"+userName,				 
					type: 'get',
					dataType: 'json',			 
					contentType: "application/json; charset=utf-8",
					
					success: function(result) { 
					
						var unreadFlag = 0;
						var loopCount = 0;
						var tempCount = 0;
						$('.unreadMessBodyCont').html("");
						$.each( result, function( key, value ) { 	/* Initial Load Popup */ 
							if(value.readUnreadInd == "0"){
								unreadFlag++;
								tempCount = unreadFlag;
							}
							
							if(unreadFlag == 0){
								$('head').append("<style>#ex1 .badge:after{ background:rgba(0,0,255,0); border:none; }</style>");
								$('head').append("<style>#ex1 .badge:after{ content:'' }</style>");
							}else{
								$('head').append("<style>#ex1 .badge:after{ background:rgba(0,0,255,1); border: 1px solid blue; }</style>");
								$('head').append("<style>#ex1 .badge:after{ content:'"+unreadFlag+"' }</style>");
								
							}
							
							loopCount++;
							if(value.msgTitle == null){
								value.msgTitle = "&#160;";
							}
							var msgText = trimWords(value.msgText);								
							 
							if(value.readUnreadInd == "0"){								// Adding the Unread Messages to Bold..
								
								if(result.length == (loopCount)){			// Removing the Last Row Border..
									$('.unreadMessBodyCont').append("<div class='rowClr'><div class='unreadMess per20 borderN'>"+value.msgTitle+"</div><div class='unreadMess per60 borderN msgBold' id=view_"+loopCount+" readUnreadInd='0'>"+msgText+"<a href='#' class='vmore' id=vmore_"+loopCount+">View More</a></div><div class='unreadDate borderN per15'>"+value.msgEndDate+"</div></div>"); 
								}else{
									$('.unreadMessBodyCont').append("<div class='rowClr'><div class='unreadMess per20'>"+value.msgTitle+"</div><div class='unreadMess per60 msgBold' id=view_"+loopCount+" readUnreadInd='0'>"+msgText+"<a href='#' class='vmore' id=vmore_"+loopCount+">View More</a></div><div class='unreadDate per20'>"+value.msgEndDate+"</div></div>"); 
								}								
							}
							
							if(value.readUnreadInd != "0"){	
								
								if(result.length == (loopCount)){			// Removing the Last Row Border..
									$('.unreadMessBodyCont').append("<div class='rowClr'><div class='unreadMess per20 borderN'>"+value.msgTitle+"</div><div class='unreadMess per60 borderN' id=view_"+loopCount+" readUnreadInd='1'>"+msgText+"<a href='#' class='vmore' id=vmore_"+loopCount+">View More</a></div><div class='unreadDate borderN per20'>"+value.msgEndDate+"</div></div>"); 
								}else{
									$('.unreadMessBodyCont').append("<div class='rowClr'><div class='unreadMess per20'>"+value.msgTitle+"</div><div class='unreadMess per60' id=view_"+loopCount+" readUnreadInd='1'>"+msgText+"<a href='#' class='vmore' id=vmore_"+loopCount+">View More</a></div><div class='unreadDate per20'>"+value.msgEndDate+"</div></div>"); 
								}
							}
							
							 
							
								if(loopCount > 3){
									$('.messBody').css({'overflow-y':'auto', 'height':'265px'});									
								}else if(loopCount == 1){
									$('.messBody').css({'overflow-y':'hidden', 'height':'125px'});
								}else if(loopCount == 2){
									$('.messBody').css({'overflow-y':'hidden', 'height':'206px'});
								}else if(loopCount == 3){
									$('.messBody').css({'overflow-y':'hidden', 'height':'306px'});
								}
							
						});	/* Initial Load Popup */ 	 
						 
				
						
						/* Click Function */ 
						$('.unread').click(function(){ 							 
							//$('.unreadMessBodyCont').html(""); 
								vlessFn();
								$('.vmore').off('click');
								$('.vmore').on('click', vmoreFn);	 
							
							 function vmoreFn(){
								 
								 $('.messBody').css({'overflow-y':'hidden'});
									var splitId = this.id.split('_')[1]; 
									$('#view_'+splitId).css('font-weight','normal');	
									$('.unreadMessBodyCont').append("<div id='currentView' class='currView'>"+result[splitId - 1].msgText+"</div>");
									
									if(loopCount > 3){
									$('#currentView').css({'overflow-y':'auto', 'height':'244px'});									
								}else if(loopCount == 1){
									$('#currentView').css({'overflow-y':'auto', 'height':'104px'});
								}else if(loopCount == 2){
									$('#currentView').css({'overflow-y':'auto', 'height':'185px'});
								}else if(loopCount == 3){
									$('#currentView').css({'overflow-y':'auto', 'height':'285px'});
								}
									
								/*	if(loopCount > 3){
										$('#currentView').css({'height':''+(result.length * 100)+ "px", 'overflow-y':'hidden'});
									}else{
										$('#currentView').css({'height':''+(result.length * 105)+ "px", 'overflow-y':'auto'});
									}*/
									
									$('.unreadMessBody').html("<div class='rowClr'><div class='readCont per20' style='width:100%'>Notification Message <a href='#' class='vless' id=vless_"+splitId+" style='position:absolute; right:26px; top:0px;'>View Less</a></div></div>");

									$('.vless').off('click');
									$('.vless').on('click', vlessFn);
									$('.messBody').scrollTop(0);
									
									if($('#view_'+splitId).attr('readUnreadInd') == "0"){			//  Unread Flag only checking and updating the flag has to be read..
									
										$('#view_'+splitId).attr('readUnreadInd', '1');
									
										var payloads = {
											"msgId" : result[splitId - 1].msgId,
											"userId" : result[splitId - 1].userId,
											"readUnreadInd" : true
										}	
										tempCount = tempCount - 1;
													
										 $.ajax({
												url: domainUrl+"user/setreadindicator",				 
												type: 'put',
												dataType: 'json',			 
												contentType: "application/json; charset=utf-8",
												data: JSON.stringify(payloads),
												
												success: function(res) { 
													//console.log("success")
								
												}
												
										 });
										  
										  
										 if(tempCount != 0){
											$('head').append("<style>#ex1 .badge:after{ content:'"+tempCount+"' }</style>");
										  }else{
										  	$('head').append("<style>#ex1 .badge:after{ background:rgba(0,0,255,0); border:none; }</style>");
											$('head').append("<style>#ex1 .badge:after{ content:'' }</style>");
										  }

										 
									}
									
									if(window.location.pathname.toLowerCase() == '/platformadmin/contract-lookup.xhtml'){
	$('.per80').css('width','70%');
	$('#currentView').css('height','137px');$('#currentView').css('top','42px');
	
	$('.per20').css('padding-left','5px');
}
$('#currentView').css('padding-left','5px');

	
									
								}
								
								function vlessFn(){		
								 $('.messBody').css({'overflow-y':'auto'});
 if(window.location.pathname.toLowerCase() == '/platformadmin/contract-lookup.xhtml'){
	$('.per80').css('width','80%');
	$('#currentView').css('height','159px');$('#currentView').css('top','20px');
	
}
$('#currentView').css('padding-left','0px');
	$('.rowClr').css('padding-left','0px');
	$('.per20').css('padding-left','5px');
									
									$("#currentView").remove();
									$('.unreadMessBody').html("<div class='rowClr'><div class='readCont per20'>Title</div><div class='readCont per60'>Notification</div><div class='readCont per15'>End Date</div><div class='readCont per5'>&#160;</div></div>");
									$('.vmore').off('click');
									$('.vmore').on('click', vmoreFn);	
								}
																	 
							
								$('#closePop').click(function(){
									$('.messBody').hide();
									$('.unreadMessBody').html("<div class='rowClr'><div class='readCont per20'>Title</div><div class='readCont per60'>Notification</div><div class='readCont per15'>End Date</div><div class='readCont per5'>&#160;</div></div>");
									unreadQFlag = true;
								});				
								
								if(unreadQFlag){
									unreadQFlag = false;
									$('.messBody').show();
								}else{
									unreadQFlag = true;
									$('.messBody').hide();
								}
						});
						
						/*Click Function*/
					
					}
					
			 });
			   
			
			function completeWords(str) { 
				return str;
			}	
				
			 
	  }	  
	 
	 $('.mainPageWrapper').on('click', '#admin-not-prevw', function(){
	// $('#admin-not-prevw').click(function(){ 	
				if (window.isFormValid) {
					$('body').addClass("loadi");  
					var scrollPos = 0;
					msgtitle =$('#admin-not-title').val();
					msgtxt =$('.note-editable').html().split('View Less')[0];
		
					msgstDate =$('#admin-not-stDate').val();
					msgEndDate =$('#admin-not-edDate').val();
					
					var selected=[]; var ik = 0;
						 $('#not_CompanyList :selected').each(function(){
							selected[ik]=$(this).text();
							ik++;
						});
						
					var companylist= selected;
					
					var msgText = trimWords(msgtxt);	
					
					$('.unreadMessBody').html("<div class='rowClr'><div class='readcomp per20'>Notification for</div><div class='readcomp per80'>"+companylist+"</div></div>");

		            $('.unreadMessBody').append("<div class='unreadMessTitle'><div class='rowClr'><div class='readCont per20'>Title</div><div class='readCont per50'>Notification</div><div class='readCont per15'>Start Date</div><div class='readCont per15'>End Date</div></div></div>");

					$('.unreadMessBody').append("<div class='unreadMessBodyCt'><div class='rowClr'><div class='unreadMess per20 borderN'>"+msgtitle+"</div><div class='unreadMess per50 borderN'  readUnreadInd='1'>"+msgText+"<a href='#unreadMessBody' class='vmore' id='vImore_1' >View More</a></div><div class='unreadDate borderN per15'>"+msgstDate+"</div><div class='unreadDate borderN per15'>"+msgEndDate+"</div></div></div>"); 
					$('.messBody').css({ 'height':'fit-content'});
					$('.per20').css('padding-left','5px');	
					$('.vmore').on('click', vmoreFn);
					
		 
		
								function vmoreFn(){		
								
									$('#vImore_1').css('font-weight','normal');	
									$('.unreadMessBodyCt').append("<div id='currentView' class='currView'>"+msgtxt+"</div>");
									
									$('#currentView').css({'height':''+(159)+ "px", 'overflow-y':'scroll'});
									
									$('.unreadMessTitle').html("<div class='rowClr'><div class='readCont per20' style='width:100%'>Notification Message <a href='#unreadMessBody' class='vless' style='position:absolute; right:26px; top:0px;'>View Less</a></div></div>");

									$('.vless').off('click');
									$('.vless').on('click', vlessFn);
									$('.messBody').scrollTop(0);  									
									$('.messBody').css({ 'height':'181px'});	

	if(window.location.pathname.toLowerCase() == '/platformadmin/contract-lookup.xhtml'){
	$('.per80').css('width','70%');
	$('#currentView').css('height','137px');$('#currentView').css('top','42px');
$('.per20').css('padding-left','5px');
}
$('#currentView').css('padding-left','5px');
	
										
								}
								
								function vlessFn(){		
 if(window.location.pathname.toLowerCase() == '/platformadmin/contract-lookup.xhtml'){
	$('.per80').css('width','80%');
	$('#currentView').css('height','159px');$('#currentView').css('top','20px');
	
}
$('#currentView').css('padding-left','0px');
	$('.rowClr').css('padding-left','0px');
	
									
									$("#currentView").remove();
									$('.unreadMessTitle').html("<div class='rowClr'><div class='readCont per20'>Title</div><div class='readCont per50'>Notification</div><div class='readCont per15'>Start Date</div><div class='readCont per15'>End Date</div></div>");
									$('.vmore').off('click');
									$('.vmore').on('click', vmoreFn);
									$('.messBody').css({ 'height':'148px'});	
									$('.per20').css('padding-left','5px');								
								}
								$('#closePop').click(function(){
									$('.messBody').hide();
									$('.unreadMessBody').html("<div class='rowClr'><div class='readCont per20'>Title</div><div class='readCont per50'>Notification</div><div class='readCont per15'>Start Date</div><div class='readCont per15'>End Date</div></div>");
									unreadINTFlag = true;
									if(window.location.pathname.toLowerCase() == '/platformadmin/contract-lookup.xhtml'){
									$('body').removeClass("loadi");
									}
								});
								
		
								if(unreadINTFlag){
									unreadINTFlag = false;
									$('.messBody').show();
								}else{
									unreadINTFlag = true;
									$('.messBody').hide();
								}
				}
		
				});
	
	
	/* Pop up Toggle */
	if($('.unread').length > 0){
	 
	 
		 
     }
	
	/* Pop up Toggle */
	
	$('html, body').scrollTop(-50);

        $(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
   if(keycode == '13' && (($('#cont-lookup').css('display')=="block" && screen.width>767) || ($('#cont-lookup-acc').css('display')=="block" && screen.width<768 )) ){
         var checki= $('#con-luk-up-srh').attr( "disabled" );
   if(checki!="disabled")
        $("#cont-lookup .check-valid").trigger('click');

    }
});	

	var pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
		 remove_None_page = ["view-contract.xhtml", "user-home.xhtml"];

		 if ($.inArray(pageName, remove_None_page) == -1)
		 {
			$('footer').removeClass("d-none"); 
			 $('header').removeClass("d-none"); 
			 $('.mainPageWrapper').removeClass("d-none"); 
			 
		 }
		 
	$('.login_box .loginBox form').addClass('clearfix');
	//---state List----
	if(window.location.pathname.toLowerCase() == '/platformadmin/admin-home.xhtml'){
		 $('#admin-link').removeClass("d-none"); 
		 $('#admin-linkmob').removeClass("d-none"); 
	}
	
	if(window.location.pathname.toLowerCase() == '/contract-lookup.xhtml'){
		$('.contin').val("");
		$('#con-luk-up-srh').attr( "disabled", "disabled" );
		$('#cont-table-first #cont-lukup-table,#contractlookup #cont-pagination').addClass('d-none');
		$('.errorMsg').addClass('d-none');

	}
	
	if( window.location.href.match(/#useful-links/g) != null){
		document.title = "Useful Links";
	}
	
	if(window.location.href.match(/#contact-us/g) != null){
		document.title = "Contact Us";
	}
	
	if(window.location.href.match(/#admin-page/g) != null){
		document.title = "Administration";
	}
	
	if(window.location.href.match(/#cont-lookup/g) != null){
		document.title = "Customer Location Search";
	}
	
	/*if(window.location.href.match(/contract-lookup/g) != null){
		document.title = "Customer Location Search";
	}*/
	
$('#admin-link').on('click', function(e){
	document.title = "Administration";
	});
$('#contact-link').on('click', function(e){
	document.title = "Contact Us";
	});
$('#useful-link').on('click', function(e){
	document.title = "Useful Links";
	});
$('#contract-link').on('click', function(e){
	document.title = "Customer Location Search";
	});	
	
	$('#useful').on('click', function(e){
	document.title = "Useful Links";
	});
	
	$('#administration').on('click', function(e){
	document.title = "Administration";
	});
	
	$('#contact').on('click', function(e){
	document.title = "Contact Us";
	});
	
$('input#TermandCheck').on('click', function(){
	if($(this).is(':checked')){
		$('#BtnTndsubmit').removeAttr('disabled');
	}
	else{
		$('#BtnTndsubmit').attr('disabled', 'disabled');
	}
	
});

$('#Confirmationclosebtn').on('click', function(e){
	$("#ConfirmationModal").modal('hide');
	});
	
$('#ConfirmationModalActivateDeactivate').on('click', function(e){
	$("#ConfirmationModalActivateDeactivate").modal('hide');
	});

$('#BtnTndsubmit').on('click', function(e){
		if(userName != null)
	UpdateTermandCondition();
  else
	  window.location.href = 'home.xhtml';
	});
	
	function UpdateTermandCondition()
	{
		
		$.ajax({
                url: domainUrl+"user/updatesitetncack/"+userName,
                type: 'put',
                dataType: 'json',
               // data: JSON.stringify(vals),
                contentType: "application/json; charset=utf-8",
				beforeSend: function(xhr) {
										xhr.setRequestHeader('EnName', enName);
											},
                success: function(result) {
					sessionStorage.setItem("isNewTermandCondition", true);
					window.location.href = 'user-home.xhtml';
                },
                error: function(jqXHR, textStatus, errorThrown) {
					error(jqXHR, textStatus, errorThrown);
					
                }
            });
		
	}
	
	
	$('button.navbar-toggler').on('click', function(e){
		$('#collapsibleNavbar').show('fast',function(){
			if(!($('.global-wrapper').hasClass('sidenavOpen'))){
				$('.global-wrapper').addClass('sidenavOpen');
			}
			else{
				$('.global-wrapper').removeClass('sidenavOpen');
				setTimeout(function(){
					$("#collapsibleNavbar").hide();
				}, 300);
			}
		});
		
		
	});
 // window.spasschange =false;
			 // window.secques =false;
 // var active=true;
    // setDomain();
 // window.userName = loginName();
 // addGoogleAnaliticsTag();
 // if(($.inArray(window.location.pathname.toLowerCase(), String.prototype.toLowerCase.apply(restrictedpages).split(",")) == -1))
 //if(window.location.pathname.toLowerCase() == '/user-home.xhtml')
    // if($('#userprofilepage').length>0)
       // {
	   //var sessionuserrole = sessionStorage.getItem("userRole")

	    // if(window.location.pathname.toLowerCase().indexOf('user-home.xhtml') >0 )
	     // {
		   // GetUserRole();
		 // }
		
		 
		 // if(window.location.pathname.toLowerCase() != '/user-home.xhtml' || window.location.href.match(/#view-contract/g) != null){
			 // $('footer').removeClass("d-none"); 
			 // $('header').removeClass("d-none"); 
			 // $('.mainPageWrapper').removeClass("d-none"); 
		 // }
		  
		 
		//GetUserRole();
	   // }
 
 function GetUserRole() {
        $.ajax({
             url: domainUrl+"user/role/" + userName,
			//url: domainUrl+"user/role/" + 'hhkjjjhj',
            type: 'get',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            beforeSend: function(xhr) {
										xhr.setRequestHeader('EnName',enName);
											},
            success: function(result) {
               
			if(result.errorCode=='RESOURCE_NOT_FOUND')
			{
				//alert('user not found')
				
				// $('footer').removeClass("d-none"); 
				// $('header').removeClass("d-none"); 
				// $('.mainPageWrapper').removeClass("d-none");

				$('footer').addClass("d-none"); 
				$('header').addClass("d-none"); 
				$('.mainPageWrapper').addClass("d-none");
				ShowPopup('Error!', 'You do not have right to access this application, please contact admin.');
				
						 $('#commonModal').modal();
				
				return 
			}
			else if(result.roleName == window.customerRole || result.roleName == window.powerUserRole || result.roleName == window.adminRole)
			{
			   if(!result.useractive) {
			   //alert('you are not active user, Please ask admin to activate');
			   active= result.useractive;
			    ShowPopup('Alert!',' Your account was deactivated. Please call the Merck Vaccine Customer Center at 866-675-8899.');
					 $('#commonModal').modal();
					setTimeout( function() {
   window.location.href = 'logout';
}, 30000 );
			    // window.location.href = 'home.xhtml';
			   } 
			   else
			    {
					sessionStorage.setItem("userRole", result.roleName);
					if(window.location.pathname.toLowerCase() != '/new-term-ack.xhtml' )
					{
					//Call new term and conditon service and check if new Term and condition.
					if(sessionStorage.getItem("userRole") == window.customerRole && sessionStorage.getItem("isNewTermandCondition") != 'true')
					 CheckNewTermandCondition(result);
				     else
						 ValidateRoleandFuntionality(result)
					}
					else
						ValidateRoleandFuntionality(result)
					
			   }
			   
			}
			  else
					{
					$('footer').addClass("d-none"); 
					$('header').addClass("d-none"); 
					$('.mainPageWrapper').addClass("d-none");
					ShowPopup('Error!', 'You do not have right to access this application, please contact admin.');
					
					$('#commonModal').modal();
					}
			 
			   
            },
            error: function(jqXHR, textStatus, errorThrown) {
             //alert('Error to fetch record !! Error=' + errorThrown);
				error(jqXHR, textStatus, errorThrown);
						// ShowPopup('Error',errorMessage);
						// $('#commonModal').modal();

            }
	});
}

function ChangeGethelp()
 {
  $('.getHelp #resg-and-login a ').attr("href", "getHelp-home.xhtml");
$('.getHelp #get-my-profile a ').attr("href", "getHelp-myProfile.xhtml");
$('.getHelp #get-cort-look a ').attr("href", "getHelp-contractLookup.xhtml");
$('.getHelp #get-useful-link a ').attr("href", "getHelp-userfulLinks.xhtml");
$('.getHelp #get-contact-us a ').attr("href", "getHelp-contactUs.xhtml");
$('.getHelp #get-adv-exp a ').attr("href", "getHelp-adverse.xhtml");
$('.getHelp #get-video-tut a ').attr("href", "getHelp-videoTutorials.xhtml");


 }

function ValidateRoleandFuntionality(result)
 {
	 
				
				  sessionStorage.setItem("userRole", result.roleName);
			   //Hide admin tab if user is not admin
			 if( window.adminRole != result.roleName)
			 {
			   $('#administration').addClass('d-none');
			   $('#admin-mobiletab').addClass('d-none');
			   $(".contract-luk-up .nav-tabs .nav-item ").addClass('tabWidth');
			 }
			 else
			 {
				  $('#admin-link').removeClass('d-none');
				 $('#admin-linkmob').removeClass('d-none');
			 }
			 
			   
			   if(sessionStorage.getItem("userRole") == window.adminRole || sessionStorage.getItem("userRole") == window.powerUserRole)
				 {
				   $("#head-back-to-home").attr("href", "admin-home.xhtml");
					$("#back-to-home").attr("href", "admin-home.xhtml");
					$("#regheaderlogo").attr("href", "admin-home.xhtml")
					 $("#gethelpheader").attr("href", "getHelp-Adminhome.xhtml");
					 $("#headerlogo").attr("href", "admin-home.xhtml");
					$(".gethelpmyprofile").addClass('disabled').removeAttr("href"); 
					ChangeGethelpMyProfileURL();
 					 hideadmincontrol();
				 }
				 else
				 {
					 
					 $("#head-back-to-home").attr("href", "user-home.xhtml");
					$("#back-to-home").attr("href", "user-home.xhtml");
					$("#regheaderlogo").attr("href", "user-home.xhtml");
					ChangeGethelp();
				 }
 
			   
			   window.userRole = result.roleName;
				 
				   if($('#userprofilepage').length>0 && userName != null)
						   {
							getVideoflag();
							$('.video-navigate').removeClass('video-hide').addClass('video-show');
						   }
 }
 
 function ChangeGethelpMyProfileURL()
 {
  
      for(var i=0;i< $("a[href^='getHelp']").length;i++) {
   if($("a[href^='getHelp']")[i].href.indexOf("getHelp-home.xhtml") >1)
    {
      $("a[href^='getHelp']")[i].href = 'getHelp-Adminhome.xhtml';
    }
    else if($("a[href^='getHelp']")[i].href.indexOf("getHelp-myProfile.xhtml") >1)
    {
      $("a[href^='getHelp']")[i].href = 'getHelp-AdminmyProfile.xhtml';
    }
    else if($("a[href^='getHelp']")[i].href.indexOf("getHelp-contractLookup.xhtml") >1)
    {
      $("a[href^='getHelp']")[i].href = 'getHelp-AdmincontractLookup.xhtml';
    } 
    else if($("a[href^='getHelp']")[i].href.indexOf("getHelp-userfulLinks.xhtml") >1)
    {
      $("a[href^='getHelp']")[i].href = 'getHelp-AdminuserfulLinks.xhtml';
    }
    else if($("a[href^='getHelp']")[i].href.indexOf("getHelp-contactUs.xhtml") >1)
    {
      $("a[href^='getHelp']")[i].href = 'getHelp-AdmincontactUs.xhtml';
    }
    else if($("a[href^='getHelp']")[i].href.indexOf("getHelp-adverse.xhtml") >1)
    {
      $("a[href^='getHelp']")[i].href = 'getHelp-Adminadverse.xhtml';
    } 
    else if($("a[href^='getHelp']")[i].href.indexOf("getHelp-videoTutorials.xhtml") >1)
    {
      $("a[href^='getHelp']")[i].href = 'getHelp-AdminvideoTutorials.xhtml';
    }
    
    }


 }

 function CheckNewTermandCondition(roleresult)
 {
	  $.ajax({
            url: domainUrl+"user/sitetncackbyusername/"+ userName,
            type: 'get',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            beforeSend: function(xhr) {
										xhr.setRequestHeader('EnName',enName);
											},
            success: function(result) {
				sessionStorage.setItem("isNewTermandCondition", result.userSiteIntentAck);
				
				if(sessionStorage.getItem("userRole") == window.customerRole )
				 {
				   if(result.userSiteIntentAck == "false")
				  {
				  window.location.href = 'new-term-ack.xhtml';
				 
				  }
				  else
					  ValidateRoleandFuntionality(roleresult); 
				 }
				 else
					 ValidateRoleandFuntionality(roleresult); 
				
				  				 
			   
            },
            error: function(jqXHR, textStatus, errorThrown) {
             //alert('Error to fetch record');
			error(jqXHR, textStatus, errorThrown);
			 
				

            }
	});
	 
 }
 
// if(sessionStorage.getItem("userRole") == window.adminRole || sessionStorage.getItem("userRole") == window.powerUserRole)
 // {
   // $("#gethelpheader").attr("href", "getHelp-Adminhome.xhtml");
   // $("#headerlogo").attr("href", "admin-home.xhtml");
   // hideadmincontrol();
 // }
function hideadmincontrol()
 {
					$('.head-pro').hide()
					$('.head-logOut').hide()
 }
 
 function addGoogleAnaliticsTag()
  {
	  if(window.location.pathname.toLowerCase() == '/user-home.xhtml')
      {
		$(".vjs-big-play-button").attr("data-tracking-category","button");
		$(".vjs-big-play-button").attr("data-tracking-action","click");
		$(".vjs-big-play-button").attr("data-tracking-element-id","user_home_Play_video");
	  }
	  else if(window.location.pathname.toLowerCase() == '/gethelp-videotutorials.xhtml')
      {
		$(".vjs-big-play-button").attr("data-tracking-category","button");
		$(".vjs-big-play-button").attr("data-tracking-action","click");
		$(".vjs-big-play-button").attr("data-tracking-element-id","get_help_VideoTutorials");
	  }
	  
	  else if(window.location.pathname.toLowerCase() == '/platformadmin/admin-home.xhtml' || window.location.pathname.toLowerCase() == '/poweruser/admin-home.xhtml')
      {
		$(".vjs-big-play-button").attr("data-tracking-category","button");
		$(".vjs-big-play-button").attr("data-tracking-action","click");
		$(".vjs-big-play-button").attr("data-tracking-element-id","admin_home_Play_video");  
	  }
	   else if(window.location.pathname.toLowerCase() == '/platformadmin/gethelp-adminvideotutorials.xhtml' || window.location.pathname.toLowerCase() == '/poweruser/gethelp-adminvideotutorials.xhtml')
      {
		 $(".vjs-big-play-button").attr("data-tracking-category","button");
		$(".vjs-big-play-button").attr("data-tracking-action","click");
		$(".vjs-big-play-button").attr("data-tracking-element-id","admin_get_help_VideoTutorials"); 
	  }
	  
	  
  
  }

function getVideoflag()
 {
    $.ajax({
            url: domainUrl+"user/getuserpreference/"+userName,
            type: 'get',
            dataType: 'json',
			//data: JSON.stringify(searchData),
            contentType: "application/json; charset=utf-8",
			beforeSend: function(xhr) {
										xhr.setRequestHeader('EnName', enName);
											},
            success: function(result) {
			//Merck Contracts Serviced By [Prime Distributor Organization]
			 if(result.UserPreference == true) 
			   {
  			 window.location.href = "contract-lookup.xhtml";
			 
			 }
			 else{
				$('footer').removeClass("d-none"); 
			 $('header').removeClass("d-none"); 
			 $('.mainPageWrapper').removeClass("d-none"); 
			 }
            },
            error: function(jqXHR, textStatus, errorThrown) {
						//alert('Error');
						
						//$('#commonModal').modal();
            }
        });
 
 }

// $('.homePage').parents('body').find('.header .topPad').addClass('d-none');
$('.homePage:visible,.cp-ack:visible,.create-profile:visible').parents('body').find('.header .topPad').addClass('d-none');
$('.homePage:visible,.cp-ack:visible,.create-profile:visible').parents('body').find('.header .header-usr-name,.header .welcome-user,.header .logout-user').addClass('d-none');
$('.homePage').parents('body').find('.header-reg-btn').removeClass('d-none');
$('.homePage').parents('body').find('.header .hdnav').css('float','right');
$('input').removeAttr('placeholder');
$('.login_box .loginButton input[type=submit]').val("SIGN IN");
$('.login_box .home-cxl').on('click', function(){
	$('.login_box .field-shadow').val("");
});
$('.login_box  .loginBox .form-error-msg').text("You have entered an invalid Username/Password. Please try again.");
$('#forgot-usr').attr("href", window.forgotusername);
	$('#forgot-pass').attr("href", window.forgotpassurl);
$('br').remove();
	
	
	
$('.contract-luk-up input[type="text"], .contract-luk-up select').on('input propertychange paste change', function(){
		if ( $('.contract-luk-up #cp-company-select').val() == "" &&  (window.location.pathname.toLowerCase() =='/platformadmin/contract-lookup.xhtml' || window.location.pathname.toLowerCase() =='/poweruser/contract-lookup.xhtml'))
		$('#con-luk-up-srh').prop('disabled', true);
		else if($('.contract-luk-up #fac-name').val() == "" && $('.contract-luk-up #str-addr').val() == "" && $('.contract-luk-up #cp-state').val() == "" && ($('.contract-luk-up #city').val() == "" || $('.contract-luk-up #city').val() == undefined ) && $('.contract-luk-up #zip').val() == "" && $('.contract-luk-up #dea').val() == "" && $('.contract-luk-up #hin').val() == "" && $('.contract-luk-up #340b').val() == "")
			$('#con-luk-up-srh').prop('disabled', true);
		else 
			$('#con-luk-up-srh').prop('disabled', false);
		
	
		
	});

		
	window.ShowPopup = function(p_title, p_message) {
        $('#commonModal').on('show.bs.modal', function(event) {
            var modal = $(this)
            modal.find('.modal-title').text(p_title);
            modal.find('.modal-body').html(p_message);
        });
    };	
	window.ShowgpoPopup = function(p_title, p_message) {
        $('#commongpoModal').on('show.bs.modal', function(event) {
            var modal = $(this)
            modal.find('.modal-title').text(p_title);
            modal.find('.modal-body').html(p_message);
        });
    };

	
	/* PDP Validation */
	window.isFormValid = true;	
	 var validateRequiredField = function () {
		var isValid = true;
		var cpFirstName=$('.cp-first-nm:visible').val();
		var cpLastName=$('.cp-last-nm:visible').val();
		var cpMiddleName=$('.cp-mi-txt:visible').val();
		var cpSuffix =$('.cp-sfx-txt:visible').val();
		var emailValue = $(".emailValue:visible").val();
		var companymail = $("#cp-company-email:visible").val();
		var phoneValue=$(".phoneNum:visible").val();
		var userValue = $(".user-name:visible").val();
		var pwdValue = $(".pwdvalue:visible").val();
		var confirmPwdValue = $(".confirmpwd:visible").val();
		var securityAns= $(".sec-ans:visible").val();
		var adminISID = $('#usrAdmin-isid:visible').val();
		var facilityNameValue=$(".facilityName:visible").val();
		var facilityAddress = $("#str-addr:visible").val();
		var nottitle= $('#admin-not-title:visible').val();
		var notcontent= $('.note-editable:visible').html();
		var StartDate = $('#admin-not-stDate:visible').val();
		var EndDate = $('#admin-not-edDate:visible').val();
		
        var companylist = [];
            $.each($('.multiselect-container').find(":checkbox:checked"), function(){   
                                      if($(this).val()!='multiselect-all')
                companylist.push($(this).val());
            });
		 $(".form-group .errorMsg").html("");
		 $(".cnt-us-radio-grp .errorMsg").html("");
		 $(".form-group .errorMsg").addClass('d-none').removeClass('invalidField');
		 $(".cnt-us-radio-grp .errorMsg").addClass('d-none').removeClass('invalidField');
		 $("input.form-control, select.form-control").removeClass("errorfield"); 
		 $(".cont-us-timezone .errorMsg").text("Error: Please select teh time zone").removeClass('invalidField').addClass(' d-none');
		 $(".cont-us-timezone ").removeClass("errorfield"); 
		$('.form-group input.form-control.req:visible').each(function () {            
            if($.trim($(this).val()) == '') {
                isValid = false;
                $(this).addClass("errorfield");
                $(this).parents(".form-group").find('.errorMsg').text("Error: Required Field").removeClass('d-none').addClass('invalidField');                
            }           
        });	
		
		var currentDate = date.mmddyyyy();
		
		var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

if(StartDate!="" && typeof StartDate !== "undefined")
{
	var arrayDate = StartDate.match(pattern);
var sttdtae = new Date(arrayDate[3], arrayDate[1] - 1, arrayDate[2]);
sttdtae = sttdtae.mmddyyyy();
var f =sttdtae.split("/");
var x =parseInt(f[2]*12*30+f[0]*30+f[1]);
}


if(EndDate!="" && typeof EndDate !== "undefined")
{
	arrayDate = EndDate.match(pattern);
var entdtae = new Date(arrayDate[3], arrayDate[1] - 1, arrayDate[2]);
entdtae = entdtae.mmddyyyy();
var t =entdtae.split("/");
var y =parseInt(t[2]*12*30+t[0]*30+t[1]);
}
var k =currentDate.split("/");
var z =parseInt(k[2]*12*30+k[0]*30+k[1]);
		 
		if(StartDate != "" && StartDate != undefined){
			
			if(z <= x){	
			
			}else{
				isValid = false;
				
				$("#admin-not-stDate:visible").addClass("errorfield");			
				$("#admin-not-stDate:visible").parents(".form-group").find('.errorMsg').text("Error: Start Date Cannot be less than Current Date").removeClass('d-none').addClass('invalidField'); 	
			} 
		}
		if(EndDate != "" && EndDate != undefined){
			if(z <= y) {	
			
			}else{
				isValid = false;
				
				$("#admin-not-edDate:visible").addClass("errorfield");			
                $("#admin-not-edDate:visible").parents(".form-group").find('.errorMsg').text("Error: End date Cannot be less than Current Date").removeClass('d-none').addClass('invalidField');  
			} 
		}
		 
		  if((StartDate != "" && StartDate != undefined && EndDate != "" && EndDate != undefined)){
			if((z <= x) && (x <= y) && (z <= y)){ 
				
			}else{
				isValid = false;
				
				$("#admin-not-edDate:visible").addClass("errorfield");			
                $("#admin-not-edDate:visible").parents(".form-group").find('.errorMsg').text("Error: End date Cannot be less than Start Date").removeClass('d-none').addClass('invalidField');  
			}	
			 
		 }
		
		if ($("input[name='callback']:checked").val() == "default" && (($('#contact-us').css('display')=="block" && screen.width>767) || ($('#contact-us-acc').css('display')=="block" && screen.width<768 ) ))
			{
			 $(".cont-us-timezone ").addClass("errorfield");                
                $(".cont-us-timezone .errorMsg").text("Error: Please select the time zone").removeClass('d-none').addClass('invalidField');
                isValid = false			
		}	
		
        $('.form-group select.form-control.req:visible').each(function () {
            if ($.trim($(this).val()) == '') {
                isValid = false;
				$(this).addClass("errorfield");
                $(this).parents(".form-group").find('.errorMsg').text("Error: Required Field").removeClass('d-none').addClass('invalidField');
            }
        });
		
		if (cpFirstName != null && cpFirstName != '') {
            var isFirst = true;
            if (!isFirst) { 
                $(".cp-first-nm:visible").addClass("errorfield");			
                $(".cp-first-nm:visible ").parents(".form-group").find('.errorMsg').text("Error: Numbers and Special characters are not allowed").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		if (nottitle != undefined)
		{
		if (nottitle.length > 100)
		{
			$(".cp-nottitle:visible").addClass("errorfield");			
                $(".cp-nottitle:visible ").parents(".form-group").find('.errorMsg').text("Error:Title should be less than 100 characters").removeClass('d-none').addClass('invalidField');
                isValid = false;
		}
		}
		
		
		 
		if (notcontent=="&nbsp;" || notcontent=="" ) {
            
             
                $(".cp-notcontent:visible").addClass("errorfield");			
                $(".cp-notcontent:visible ").parents(".form-group").find('.errorMsg').text("Error:Required Field").removeClass('d-none').addClass('invalidField');
                isValid = false;
            
        }
		
		if ($('.note-editable').html() != undefined){
		var exactTxt = $('.note-editable').html().replace('<a href="#" class="vles">View Less</a>','');
		
	 exactTxt = exactTxt.replace('<a class=\"vles\" href=\"#\">View Less</a>','');
			exactTxt = exactTxt.replace('<a href=\"#\" class=\"vles\">View Less</a>','');
		var	trimTxt=plainhtmltxt(exactTxt);
		
		
		
		if( trimTxt.length > 2000)
		{
			 $(".cp-notcontent:visible").addClass("errorfield");			
                $(".cp-notcontent:visible ").parents(".form-group").find('.errorMsg').text("Error:Content should be less than 2000 characters").removeClass('d-none').addClass('invalidField');
                isValid = false;
		}
		}
			
		
		if (companylist != undefined){
		if (companylist.length==0) {
            
             
                // $(".select-click:visible").addClass("errorfield");			
                // $(".select-click:visible ").parents(".form-group").find('.errorMsg').text("Error:Required Field").removeClass('d-none').addClass('invalidField');
                // isValid = false;
            
        } }
		
		if(facilityNameValue != null && facilityNameValue != ''){
			 var isValidfacilityname = isValidaddress(facilityNameValue);
            if (!isValidfacilityname) {
                $(".facilityName:visible").addClass("errorfield");                 
                $(".facilityName:visible").parents(".form-group").find('.errorMsg').text("Error:  Special characters are not allowed except:  comma (,), hyphen (-), ampersand (&), period (.), apostrophe/single quote (’), percent (%), asterisk (*), hash/pound sign (#), and slash (/)").removeClass('d-none').addClass('invalidField');
                isValid = false
			}			
		}
		
		
		if(facilityAddress != null && facilityAddress != ''){
			 var isValidfacilityadd = isValidstreetad(facilityAddress);
            if (!isValidfacilityadd) {
                $("#str-addr:visible").addClass("errorfield");                 
                $("#str-addr:visible").parents(".form-group").find('.errorMsg').text("Error: Please provide at least 3 characters.").removeClass('d-none').addClass('invalidField');
                isValid = false
			}			
		}
		
		
		if (cpLastName != null && cpLastName != '') {
            var isLast = true;
            if (!isLast) { 
                $(".cp-last-nm:visible").addClass("errorfield");			
                $(".cp-last-nm:visible").parents(".form-group").find('.errorMsg').text("Error: Numbers and Special characters are not allowed").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		if (cpMiddleName != null && cpMiddleName != '') {
            var isMiddle = isValidMiddleName(cpMiddleName);
            if (!isMiddle) { 
                $(".cp-mi-txt:visible").addClass("errorfield");			
                $(".cp-mi-txt:visible").parents(".form-group").find('.errorMsg').text("Error: Numbers and Special characters are not allowed").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		if (cpSuffix != null && cpSuffix != '') {
            var isSuffix = isValidSuffix(cpSuffix);
            if (!isSuffix) { 
                $(".cp-sfx-txt:visible").addClass("errorfield");			
                $(".cp-sfx-txt:visible").parents(".form-group").find('.errorMsg').text("Error: Special characters are not allowed").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		if (emailValue != null && emailValue != '') {
            var isEmail = isValidEmail(emailValue);
            if (!isEmail) { 
                $(".emailValue:visible").addClass("errorfield");			
                $(".emailValue:visible").parents(".form-group").find('.errorMsg').text("Error: Invalid Email").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		
		if (companymail != null && companymail != '') {
            var isEmail = isValidEmail(companymail);
			var isattherate = false;
			 if(companymail.search("@")>0)
			 {
				isattherate  = true;
			 }
			 
            if(isEmail || isattherate) { 
                $("#cp-company-email:visible").addClass("errorfield");			
                $("#cp-company-email:visible").parents(".form-group").find('.errorMsg').text("Error: Please do not enter @ symbol and any part of the email domain in this field. It will be submitted automatically as shown outside the box.").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		
		
		if (phoneValue != null && phoneValue != '') {
            var isPhNum = isValidPhNum(phoneValue);
            if (!isPhNum) {
                $(".phoneNum:visible").addClass("errorfield");                
                $(".phoneNum:visible").parents(".form-group").find('.errorMsg').text("Error: Please enter a valid Phone Number").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		if (userValue != null && userValue != '') {
            var isUser = isValidUsername(userValue);
            if (!isUser) { 
                $(".user-name:visible").addClass("errorfield");			
                $(".user-name:visible").parents(".form-group").find('.errorMsg').text("Error: Username must be between 3 and 16 characters in length And Special characters not allowed").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		if (pwdValue != null && pwdValue != '') {
            var isStgPwd = isStrongPwd(pwdValue);
			if (!isStgPwd) {
			   $(".pwdvalue:visible").addClass("errorfield");                
               $(".pwdvalue:visible").parents(".form-group").find('.errorMsg').text("Error: Password must match specified format").removeClass('d-none').addClass('invalidField');
               isValid = false
			}
			else {
				if (pwdValue != confirmPwdValue) {
					$(".confirmpwd:visible").addClass("errorfield");			
					$(".confirmpwd:visible").parents(".form-group").find('.errorMsg').text("Error: Password and Repeat Password must match. Please try again.").removeClass('d-none').addClass('invalidField');
					isValid = false
				}	
			}			
		}
		if (securityAns != null && securityAns != '') {
            var isUsersec = true;
            /*var isUsersec = isValidSecurity(securityAns);*/
            if (!isUsersec) { 
                $(".sec-ans:visible").addClass("errorfield");			
                $(".sec-ans:visible").parents(".form-group").find('.errorMsg').text("Error: Special characters are not allowed").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		if (adminISID != null && adminISID != '') {
            var isAdmin = isValidAdmin(adminISID);
            if (!isAdmin) { 
                $("#usrAdmin-isid:visible").addClass("errorfield");			
                $("#usrAdmin-isid:visible").parents(".form-group").find('.errorMsg').text("Error: ISID must be between 3 and 16 characters in length And Special characters not allowed").removeClass('d-none').addClass('invalidField');
                isValid = false
            }
        }
		
		 if (!isValid)
             $('html, body').animate({
                  scrollTop: $(".invalidField:eq(0)").offset().top - 85
				
             }, 700);  		
		return isValid;
	 }
	 var isValidAdmin= function(isid){
		var regex = /^([a-zA-Z0-9]{3,16})$/;
		return regex.test(isid);       
	 }
	 var isValidName =function(fname){
		var regex =/^[a-zA-Z]+$/;
		return regex.test(fname);
	}
        var  isValidMiddleName=function(middle){
		var regex =/^[a-zA-Z]+$/;
		return regex.test(middle);
        }

	var isValidSuffix=function(suffix){
		//var regex=/^[a-zA-Z0-9\-\s]+$/;
		var regex =/^[a-zA-Z0-9]+$/;
		return regex.test(suffix);
	}
	 var isValidEmail = function(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
	var isValidUsername = function(uname) {		
			var regex = /^([a-zA-Z0-9]{3,16})$/;
			return regex.test(uname);       
    }
	
	var isValidstreetad = function(streetad) {		
	
	if (streetad.length==0|| streetad.length >2 )
   return true;
   else 
	 return false;    
			
    }
	
	
	var isValidaddress=function(address){
		 //var regex=/^[a-zA-Z0-9]+$/;
		  var regex=/^[a-zA-Z0-9,.&-':*%#/\-\s\\\\]+$/;
		//var regex=/^[a-zA-Z0-9,.&-':*%#/\-\s]+\$/;
		return regex.test(address);
	}
	
	var isStrongPwd = function (pwd) {
        var pwdregx= /((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}|(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#?!@$%^&*-]).{8,}|(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-]).{8,}).*/;
        return pwdregx.test(pwd);
    }
	var	isValidSecurity=function(securityAns){		
		var regex=/^[a-zA-Z0-9\-\s]+$/;
		return regex.test(securityAns);
	}
	var isValidPhNum = function(phone) {
		var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;	 
		return regex.test(phone);
    } 
	
	//$(".mainPageWrapper").on('click', ".check-valid", function() {		
$('.check-valid').on('click', function() {        
		window.isFormValid = validateRequiredField();		
    });	


	
	if($("#contractlookup").length > 0){
		var hashvalue = location.hash.substr(1);
		if(hashvalue == "UsefulLinks"){
			$("#useful").trigger("click");
		}
		if(hashvalue == "ContactUs"){
			$("#contact").trigger("click");
		}
	}
	
	$('#reset-btn').on('click', function() {
		$('.contin').val("");
		$('#con-luk-up-srh').attr( "disabled", "disabled" );
		$('#cont-table-first #cont-lukup-table,#contractlookup #cont-pagination').addClass('d-none');
		$('.errorMsg').addClass('d-none');
	});
	$('.pass-close').on('click',function(){
		$('.password-rule').addClass('d-none').removeClass('show');
	});
	$('.psw-expand').on('click',function(){
		$('.password-rule').removeClass('d-none');
	});
	$('#modal-closebtn').on('click', function(){
		$('#commonModal').modal('hide');
		
		if(active==false)
		{
			 active=true;
			 window.location.href = 'logout';
		}
		
		if(window.secques ==true)
		{
			 
			 window.secques =false;
			 window.location.href = 'myprofile.xhtml';
		}
		
		if(window.spasschange ==true)
		{
			 window.spasschange =false;
			 window.location.href = 'home.xhtml';
		}
	});
	/*For Specific Tabs*/
	
	var hash = window.location.hash;
	if($(window).width() >=768){
		if(hash){
			$('.nav-tabs a[href="'+hash+'"]').tab('show');
						
			$(window).scrollTop(0);
			}			
	}	
	if ($(window).width() <= 767) {
	  if(hash){
		$('.card-header a[href="'+hash+'"]').click();			
		$(window).scrollTop(0);		
	  }  
	  
	}
	
	window.location.hash="";
	/*Forget UserName and Password Popup*/
	$('.forgotusr-link').on('click', function(e){
		e.preventDefault();
		var link = $(this).attr("href");
		var newPopup = "'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,width=923,height=445'";
		var newPdpWindow = window.open(link, "sendLink", newPopup);
		newPdpWindow.focus();
	});
$('#userprofilepage').on('click','.vjs-big-play-button',function(){
	$('.vjs-mouse-display').click();
})

$('#email-ok').on('click', function(e){
	window.location.href = 'home.xhtml';
	});
$('.mainPageWrapper').on('click', '.cnt-us-smt', function(){
	$(".cnt-us-radio-grp .errorMsg").html("");		 
	$(".cnt-us-radio-grp .errorMsg").addClass('d-none');
	if (!$("input[name='callback']:visible:checked").val()) {
		$(".cnt-us-radio-grp .errorMsg").text("Error: Please select the time zone").removeClass('d-none');;
        window.isFormValid = false	
	}
});

$('.mainPageWrapper').on('click', '#admin-not-manage', function(){
$('.note-icon-video').parent('button').addClass('d-none');
$('.note-modal-content .note-modal-footer').css('margin-bottom','15px');
$('.note-modal-footer p').addClass('d-none');
  $('.btn-codeview').addClass('d-none');
  $('#noti-table').css('overflow-x','auto');
  $('head').append("<style>.dropdown-toggle:after{ display:none }</style>");
  $('.messBody').addClass('messBodyint');
  $('.note-modal-footer').css('padding-right','30px');
});

$('.mainPageWrapper').on('click', '#admin-page', function(){
$('.note-icon-video').parent('button').addClass('d-none');
$('.note-modal-content .note-modal-footer').css('margin-bottom','15px');
$('.note-modal-footer p').addClass('d-none');
  $('.btn-codeview').addClass('d-none');
  $('#noti-table').css('overflow-x','auto');
  $('head').append("<style>.dropdown-toggle:after{ display:none }</style>");
  $('.messBody').addClass('messBodyint');
});




$('.mainPageWrapper').on('click', '#admin-link', function(){
document.title = "Administration";
});

 function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    }
if(userName != null && window.location.pathname.toLowerCase() != '/home.xhtml')
			GetUserRole();
		else if (window.isInternal == 'true' && window.location.pathname.toLowerCase() == '/home.xhtml' && GetParameterValues("authenticated")== 'false')
		{
			$('footer').addClass("d-none"); 
			$('header').addClass("d-none"); 
			$('#homePage').addClass("d-none"); 
			$('.loginBox').addClass("d-none");
			//alert('You do not have right to access this application, please contact admin.');
			// ShowPopup('Error!', 'You do not have right to access this application, please contact admin.');
			ShowPopup('Error!', 'You are not authorized to access this application. Please contact the Merck Admin.');
			
						 $('#commonModal').modal();
		}
	
});



Date.prototype.mmddyyyy = function() {
	  var yyyy = this.getFullYear().toString();
	  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	  var dd  = this.getDate().toString();
	  return (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]) + "/" + yyyy;
	};
	
	var date = new Date();
		
});

function error(jqXHR, textStatus, errorThrown){
	
	 if( jqXHR.status==500 )
								 {
								 //alert('Given email already exist, please try again');
								  ShowPopup('Error!','<b>Internal Server Error (Error 500)</b><br>Please try again later.  Call 1-866-675-8899 for assistance.');
								  $('.modal-title').addClass('errRed');
			$('.modal-body').addClass('errRed');
					              $('#commonModal').modal();
								 }
								 else if(jqXHR.status==404)
								 {
									ShowPopup('Error!', '<b>PAGE NOT FOUND (Error 404)</b><br> Call 1-866-675-8899 for assistance.');
				$('.modal-title').addClass('errRed');
			$('.modal-body').addClass('errRed');
						 $('#commonModal').modal(); 
								 }

else {
	
	ShowPopup('Error!', errorMessage);
				$('.modal-title').addClass('errRed');
			$('.modal-body').addClass('errRed');
						 $('#commonModal').modal();
	
}}

function trimWords(str) {
				var strConverted = str.replace(/<\/?[^>]+(>|$)/g, "");
				var strSpecial1 = strConverted.replace(/&/g, "");
				var strSpecial2 = strConverted.replace(/nbsp/g, "");
				var strSpecial = strSpecial2.replace(/[^\w\s]/gi, '');				
				var trimLen = 100; 
				var lastSplit = strSpecial.split(" ");
				var lastWord = lastSplit[lastSplit.length - 1]
				var trimmedString = strSpecial.substring(0, trimLen);
				
				if(lastSplit.length > 10 ){
					$(this).parent().css('overflow-y', 'scroll');
				}
				if (strSpecial.length > 100)
				return trimmedString +".. "+ lastWord;
			else
				return strSpecial;
			}

function plainhtmltxt(str) {
				var strConverted = str.replace(/<\/?[^>]+(>|$)/g, "");
				var strSpecial1 = strConverted.replace(/&/g, "");
				var strSpecial2 = strConverted.replace(/nbsp/g, "");
				var strSpecial = strSpecial2.replace(/[^\w\s]/gi, '');				
				//var trimLen = 100; 
				//var lastSplit = strSpecial.split(" ");
				//var lastWord = lastSplit[lastSplit.length - 1]
				//var trimmedString = strSpecial.substring(0, trimLen);
				
				//if(lastSplit.length > 10 ){
					//$(this).parent().css('overflow-y', 'scroll');
				//}
				
				return strSpecial;
			}			