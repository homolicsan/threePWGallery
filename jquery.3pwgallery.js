// JavaScript Document
/*
 * jQuery 3pwGallery v0.1 - http://3peopleworking.com/
 *
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2011 Iván Homolicsan
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/


(function($){

$.fn.threePWGallery = function(options_user){

	/*------------------------------------------------------------------------------------------------------*/
	// OPTIONS_

	$.fn.threepwGallery.options_default = {
    		speed : 2000,
        duration : 3000,
        opacity : 0.5,
        autoplay: false,
        mode : 'linear',
       	elements_by_th_group: 8,
       	init: 0,
       	correction:1,
       	effect:'slide',// slideFade
       	toggle_play_stop:true
   	};
      	
    options = $.extend( $.fn.threepwGallery.options_default, options_user );                    
	  
	 	  
    var gallery = $(this); // guardamos el objeto (Element) en una variable para acceso futuro
    
    var group_location = 0;
    var count_th_group = $(this).find('.holder_thumbs > ul > li').length / options.elements_by_th_group ;
    		
    var move_to = options.init;
    var current = 1;
    
    var image_width = $(this).find('.holder ul.content > li').width(); // Ancho de la imagen
    var image_total =  $(this).find('.holder ul.content > li').length; // Cantidad de imagenes
    var total_width = image_width * image_total; // Ancho total del UL . Ancho de imagen * cantida de elementos
    
    $(this).total_width_ = total_width;
    
    var displacement =  image_width;
  	 
  	// Si el deslpazamiento es mayor que cero significa que la imagen actual es la del medio.  	
  	
    var current_correction = (options.init == 0)? 1: 0;

    var last_image = (options.init == 0)? image_total:image_total-1;
    
    var th_group_width = $(this).find('.holder_thumbs').width(); 
   
     		
    $(this).find('.holder > ul').width(total_width); // Asignamos el ancho total
    		    		
    var status_play = false; // Variable en donde guardamos el status de play

    /*------------------------------------------------------------------------------------------------------*/
	// Metodos    		
				
	//PLAY
    var play_gallery = function(){
		status_play = true;    		
    	slide(1);
    };
    		
    //STOP
    var stop_gallery = function(){
    	status_play = false;
    };
    	
    //Method slide to = imagen a la cual ir 
    var slide = function(to,no_delay) {
    	
    	
    		
	   
    		
 		//Aplicamos un opacity a todos las imagenes ecepto a la actual
 		
 		if (options.effect == 'slideFade' )
	 		gallery.find('ul.content :not(li:eq('+ current +')) img, 					ul.thumbs :not(li:eq('+ current +'))img'	).css({
				opacity: options.opacity
			});
		
			  		
		if ( to <= image_total ){
			
    		move_to = options.init +  ( to-1 ) * displacement;
    	
	    }else{
			move_to = options.init ;  // Si estamos en el final volvemos al principio
		  	to =1;  			
		}
		
		
			    
  //Animation
   
		if( options.mode == 'circle' && to == last_image ){

    		gallery.find('.holder .move').css('margin-left',- options.init );
			to = 1;
			
    		if ( status_play == true){
    			slide(to+1); // pasamos a la siguiente	imagen													
    		}
				
		}else{		
			
			var delay = options.duration ;

			if (no_delay) delay = 0; 
			
			
			
			
	    	gallery.find('.holder .move').delay(delay).animate({    				
				'margin-left': '-' + move_to
			  	},
			  	options.speed,
			  		
			  	function() { // Animation complete.		 
					current = to;	    
					// Mostramos la imagen actual con un opacity 1
					
					
					if (options.effect == 'slideFade' ){
					
		  				gallery.find('ul.content li:eq('+(to-current_correction)+') img').animate({
		  					opacity: 1
	  					});
	  			
	  					gallery.find('ul.thumbs li:eq('+(to-current_correction)+') img').animate({
	  						opacity: 1
	  					});
	  					
	  				}	
	  				
			  		gallery.find('ul.content li, ul.thumbs li').removeClass('selected');			
		  				gallery.find('ul.content li:eq('+(to-current_correction)+'), ul.thumbs li:eq('+(to-current_correction)+')').addClass('selected');
		  							
							if (status_play == true ){

								slide(to+1); // pasamos a la siguiente	imagen
							}
													
  						});
  					}
  			};
  			
				/*------------------------------------------------------------------------------------------------------*/  		
    	  // EVENTS 		
    		//Event Move To
    		gallery.find('.thumbs li a').each(function(e){
    		
    			$(this).click( function(el) {
	   				el.preventDefault();

    				gallery.find('.holder .move').stop(true);
    				
    				slide (e + current_correction,true) ;
    					
    			});
    			
    		});
    		
    		/*gallery.find('.holder .content li a').each(function(e){
    		
    			$(this).click( function(el) {
    				el.preventDefault();
    				gallery.find('.holder .move').stop(true);
    				slide (e + current_correction) ;    				
    			});

    		});
    		*/
			
			//---------------------------------------
    		
    		// Prev Image
    		gallery.find('.prev').click(function(){
    			
    			gallery.find('.holder .move').stop(true);
    			slide(current - 1,true);
    			
    		
    		});
    		
    		// Next Image
    		gallery.find('.next').click(function(){
    			gallery.find('.holder .move').stop(true);
    			slide(current + 1,true);
    			
    		});
    		
    		
    		gallery.find('.controls .stop').mouseover(function(){
    			
    		});
    		
    		// stop Gallery
    		gallery.find('.controls .stop').click(function(e) {
    				e.preventDefault();
    				stop_gallery();
		    		gallery.find('.holder .move').stop(false,true);
		    		
		    		gallery.find('.play').css({visibility:'visible'});
		    		gallery.find('.stop').css({visibility:'hidden'});
	    	});
	    	
	    	gallery.find('.controls .play').click(function(e) {
	    		e.preventDefault();
	    		play_gallery();
	    		
	    		
		    	gallery.find('.play').css({visibility:'hidden'});
		    	gallery.find('.stop').css({visibility:'visible'});
		    		
	    	});
	    	
	    	
	    	// Prev Group
	    	gallery.find('.prev_group').click(function(e) {
	    		e.preventDefault()
	    		if (group_location > 0)
		    		group_location --;
	    		
	    		var move_to_th = group_location * th_group_width;
	    		
	    		gallery.find('.thumbs').animate({'margin-left':'-' + move_to_th});			
	    	});
	    	
	    	// Next Group
	    	gallery.find('.next_group').click(function(e) {
	    		e.preventDefault();
	    		
		    	if (group_location < count_th_group -1)
		    		group_location ++;
		    		
	    		var move_to_th = group_location * th_group_width;
	    		
	    		gallery.find('.thumbs').animate({'margin-left':'-' + move_to_th});			
	    	});
	    	
	    	
	    	
	    		
	    	
	    	///
	    	
	    	if (options.autoplay){
    			play_gallery();

    			
	    	}
    			
    
    	};
    
	})(jQuery);
	
