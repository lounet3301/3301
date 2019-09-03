function bp_init_activity(){void 0!==jq.cookie("bp-activity-filter")&&jq("#activity-filter-select").length&&jq('#activity-filter-select select option[value="'+jq.cookie("bp-activity-filter")+'"]').prop("selected",!0),void 0!==jq.cookie("bp-activity-scope")&&jq(".activity-type-tabs").length&&(jq(".activity-type-tabs li").each(function(){jq(this).removeClass("selected")}),jq("#activity-"+jq.cookie("bp-activity-scope")+", .item-list-tabs li.current").addClass("selected"))}function bp_init_objects(e){jq(e).each(function(t){void 0!==jq.cookie("bp-"+e[t]+"-filter")&&jq("#"+e[t]+"-order-select select").length&&jq("#"+e[t]+'-order-select select option[value="'+jq.cookie("bp-"+e[t]+"-filter")+'"]').prop("selected",!0),void 0!==jq.cookie("bp-"+e[t]+"-scope")&&jq("div."+e[t]).length&&(jq(".item-list-tabs li").each(function(){jq(this).removeClass("selected")}),jq("#"+e[t]+"-"+jq.cookie("bp-"+e[t]+"-scope")+", #object-nav li.current").addClass("selected"))})}function bp_filter_request(e,t,i,a,s,n,o,r,l){if("activity"===e)return!1;null===i&&(i="all"),jq.cookie("bp-"+e+"-scope",i,{path:"/",secure:"https:"===window.location.protocol}),jq.cookie("bp-"+e+"-filter",t,{path:"/",secure:"https:"===window.location.protocol}),jq.cookie("bp-"+e+"-extras",o,{path:"/",secure:"https:"===window.location.protocol}),jq(".item-list-tabs li").each(function(){jq(this).removeClass("selected")}),jq("#"+e+"-"+i+", #object-nav li.current").addClass("selected"),jq(".item-list-tabs li.selected").addClass("loading"),jq('.item-list-tabs select option[value="'+t+'"]').prop("selected",!0),"friends"!==e&&"group_members"!==e||(e="members"),bp_ajax_request&&bp_ajax_request.abort(),bp_ajax_request=jq.post(ajaxurl,{action:e+"_filter",cookie:bp_get_cookies(),object:e,filter:t,search_terms:s,scope:i,page:n,extras:o,template:l},function(e){if("pag-bottom"===r&&jq("#subnav").length){var t=jq("#subnav").parent();jq("html,body").animate({scrollTop:t.offset().top},"slow",function(){jq(a).fadeOut(100,function(){jq(this).html(e),jq(this).fadeIn(100)})})}else jq(a).fadeOut(100,function(){jq(this).html(e),jq(this).fadeIn(100)});jq(".item-list-tabs li.selected").removeClass("loading")})}function bp_activity_request(e,t){null!==e&&jq.cookie("bp-activity-scope",e,{path:"/",secure:"https:"===window.location.protocol}),null!==t&&jq.cookie("bp-activity-filter",t,{path:"/",secure:"https:"===window.location.protocol}),jq.cookie("bp-activity-oldestpage",1,{path:"/",secure:"https:"===window.location.protocol}),jq(".item-list-tabs li").each(function(){jq(this).removeClass("selected loading")}),jq("#activity-"+e+", .item-list-tabs li.current").addClass("selected"),jq("#object-nav.item-list-tabs li.selected, div.activity-type-tabs li.selected").addClass("loading"),jq('#activity-filter-select select option[value="'+t+'"]').prop("selected",!0),jq(".widget_bp_activity_widget h2 span.ajax-loader").show(),bp_ajax_request&&bp_ajax_request.abort(),bp_ajax_request=jq.post(ajaxurl,{action:"activity_widget_filter",cookie:bp_get_cookies(),_wpnonce_activity_filter:jq("#_wpnonce_activity_filter").val(),scope:e,filter:t},function(e){jq(".widget_bp_activity_widget h2 span.ajax-loader").hide(),jq("div.activity").fadeOut(100,function(){jq(this).html(e.contents),jq(this).fadeIn(100),bp_legacy_theme_hide_comments()}),void 0!==e.feed_url&&jq(".directory #subnav li.feed a, .home-page #subnav li.feed a").attr("href",e.feed_url),jq(".item-list-tabs li.selected").removeClass("loading")},"json")}function bp_legacy_theme_hide_comments(){var e,t,i,a=jq("div.activity-comments");if(!a.length)return!1;a.each(function(){jq(this).children("ul").children("li").length<5||(comments_div=jq(this),e=comments_div.parents("#activity-stream > li"),t=jq(this).children("ul").children("li"),i=" ",jq("#"+e.attr("id")+" li").length&&(i=jq("#"+e.attr("id")+" li").length),t.each(function(a){a<t.length-5&&(jq(this).hide(),a||jq(this).before('<li class="show-all"><a href="#'+e.attr("id")+'/show-all/">'+BP_DTheme.show_x_comments.replace("%d",i)+"</a></li>"))}))})}function checkAll(){var e,t=document.getElementsByTagName("input");for(e=0;e<t.length;e++)"checkbox"===t[e].type&&(""===$("check_all").checked?t[e].checked="":t[e].checked="checked")}function clear(e){if(e=document.getElementById(e)){var t=e.getElementsByTagName("INPUT"),i=e.getElementsByTagName("OPTION"),a=0;if(t)for(a=0;a<t.length;a++)t[a].checked="";if(i)for(a=0;a<i.length;a++)i[a].selected=!1}}function bp_get_cookies(){var e,t,i,a,s,n=document.cookie.split(";"),o={};for(e=0;e<n.length;e++)i=(t=n[e]).indexOf("="),a=jq.trim(unescape(t.slice(0,i))),s=unescape(t.slice(i+1)),0===a.indexOf("bp-")&&(o[a]=s);return encodeURIComponent(jq.param(o))}function bp_get_query_var(e,t){var i={};return(t=void 0===t?location.search.substr(1).split("&"):t.split("?")[1].split("&")).forEach(function(e){i[e.split("=")[0]]=e.split("=")[1]&&decodeURIComponent(e.split("=")[1])}),!(!i.hasOwnProperty(e)||null==i[e])&&i[e]}var jq=jQuery,bp_ajax_request=null,newest_activities="",activity_last_recorded=0;jq(document).ready(function(){bp_init_activity();var e=["members","groups","blogs","group_members"],t=jq("#whats-new");if(bp_init_objects(e),t.length&&bp_get_querystring("r")){var i=t.val();jq("#whats-new-options").slideDown(),t.animate({height:"3.8em"}),jq.scrollTo(t,500,{offset:-125,easing:"swing"}),t.val("").focus().val(i)}else jq("#whats-new-options").hide();if(t.focus(function(){jq("#whats-new-options").slideDown(),jq(this).animate({height:"3.8em"}),jq("#aw-whats-new-submit").prop("disabled",!1),jq(this).parent().addClass("active"),jq("#whats-new-content").addClass("active");var e=jq("form#whats-new-form"),t=jq("#activity-all");e.hasClass("submitted")&&e.removeClass("submitted"),t.length&&(t.hasClass("selected")?"-1"!==jq("#activity-filter-select select").val()&&(jq("#activity-filter-select select").val("-1"),jq("#activity-filter-select select").trigger("change")):(jq("#activity-filter-select select").val("-1"),t.children("a").trigger("click")))}),jq("#whats-new-form").on("focusout",function(e){var i=jq(this);setTimeout(function(){if(!i.find(":hover").length){if(""!==t.val())return;t.animate({height:"2.2em"}),jq("#whats-new-options").slideUp(),jq("#aw-whats-new-submit").prop("disabled",!0),jq("#whats-new-content").removeClass("active"),t.parent().removeClass("active")}},0)}),jq("#aw-whats-new-submit").on("click",function(){var e,t=0,i=jq(this),a=i.closest("form#whats-new-form"),s={};return jq.each(a.serializeArray(),function(e,t){"_"!==t.name.substr(0,1)&&"whats-new"!==t.name.substr(0,9)&&(s[t.name]?jq.isArray(s[t.name])?s[t.name].push(t.value):s[t.name]=new Array(s[t.name],t.value):s[t.name]=t.value)}),a.find("*").each(function(){(jq.nodeName(this,"textarea")||jq.nodeName(this,"input"))&&jq(this).prop("disabled",!0)}),jq("div.error").remove(),i.addClass("loading"),i.prop("disabled",!0),a.addClass("submitted"),object="",item_id=jq("#whats-new-post-in").val(),content=jq("#whats-new").val(),firstrow=jq("#buddypress ul.activity-list li").first(),activity_row=firstrow,timestamp=null,firstrow.length&&(activity_row.hasClass("load-newest")&&(activity_row=firstrow.next()),timestamp=activity_row.prop("class").match(/date-recorded-([0-9]+)/)),timestamp&&(t=timestamp[1]),item_id>0&&(object=jq("#whats-new-post-object").val()),e=jq.extend({action:"post_update",cookie:bp_get_cookies(),_wpnonce_post_update:jq("#_wpnonce_post_update").val(),content:content,object:object,item_id:item_id,since:t,_bp_as_nonce:jq("#_bp_as_nonce").val()||""},s),jq.post(ajaxurl,e,function(e){if(a.find("*").each(function(){(jq.nodeName(this,"textarea")||jq.nodeName(this,"input"))&&jq(this).prop("disabled",!1)}),e[0]+e[1]==="-1")a.prepend(e.substr(2,e.length)),jq("#"+a.attr("id")+" div.error").hide().fadeIn(200);else{if(0===jq("ul.activity-list").length&&(jq("div.error").slideUp(100).remove(),jq("#message").slideUp(100).remove(),jq("div.activity").append('<ul id="activity-stream" class="activity-list item-list">')),firstrow.hasClass("load-newest")&&firstrow.remove(),jq("#activity-stream").prepend(e),t||jq("#activity-stream li:first").addClass("new-update just-posted"),0!==jq("#latest-update").length){var i=jq("#activity-stream li.new-update .activity-content .activity-inner p").html(),s=jq("#activity-stream li.new-update .activity-content .activity-header p a.view").attr("href"),n="";""!==jq("#activity-stream li.new-update .activity-content .activity-inner p").text()&&(n=i+" "),n+='<a href="'+s+'" rel="nofollow">'+BP_DTheme.view+"</a>",jq("#latest-update").slideUp(300,function(){jq("#latest-update").html(n),jq("#latest-update").slideDown(300)})}jq("li.new-update").hide().slideDown(300),jq("li.new-update").removeClass("new-update"),jq("#whats-new").val(""),a.get(0).reset(),newest_activities="",activity_last_recorded=0}jq("#whats-new-options").slideUp(),jq("#whats-new-form textarea").animate({height:"2.2em"}),jq("#aw-whats-new-submit").prop("disabled",!0).removeClass("loading"),jq("#whats-new-content").removeClass("active")}),!1}),jq("div.activity-type-tabs").on("click",function(e){var t,i,a=jq(e.target).parent();if("STRONG"===e.target.nodeName||"SPAN"===e.target.nodeName)a=a.parent();else if("A"!==e.target.nodeName)return!1;return jq.cookie("bp-activity-oldestpage",1,{path:"/",secure:"https:"===window.location.protocol}),t=a.attr("id").substr(9,a.attr("id").length),i=jq("#activity-filter-select select").val(),"mentions"===t&&jq("#"+a.attr("id")+" a strong").remove(),bp_activity_request(t,i),!1}),jq("#activity-filter-select select").change(function(){var e,t=jq("div.activity-type-tabs li.selected"),i=jq(this).val();return e=t.length?t.attr("id").substr(9,t.attr("id").length):null,bp_activity_request(e,i),!1}),jq("div.activity").on("click",function(e){var t,i,a,s,n,o,r,l,c,d,p=jq(e.target);return p.hasClass("fav")||p.hasClass("unfav")?!p.hasClass("loading")&&(t=p.hasClass("fav")?"fav":"unfav",i=p.closest(".activity-item"),a=i.attr("id").substr(9,i.attr("id").length),r=bp_get_query_var("_wpnonce",p.attr("href")),p.addClass("loading"),jq.post(ajaxurl,{action:"activity_mark_"+t,cookie:bp_get_cookies(),id:a,nonce:r},function(e){p.removeClass("loading"),p.fadeOut(200,function(){jq(this).html(e),jq(this).attr("title","fav"===t?BP_DTheme.remove_fav:BP_DTheme.mark_as_fav),jq(this).fadeIn(200)}),"fav"===t?(jq(".item-list-tabs #activity-favs-personal-li").length||(jq(".item-list-tabs #activity-favorites").length||jq(".item-list-tabs ul #activity-mentions").before('<li id="activity-favorites"><a href="#">'+BP_DTheme.my_favs+" <span>0</span></a></li>"),jq(".item-list-tabs ul #activity-favorites span").html(Number(jq(".item-list-tabs ul #activity-favorites span").html())+1)),p.removeClass("fav"),p.addClass("unfav")):(p.removeClass("unfav"),p.addClass("fav"),jq(".item-list-tabs ul #activity-favorites span").html(Number(jq(".item-list-tabs ul #activity-favorites span").html())-1),Number(jq(".item-list-tabs ul #activity-favorites span").html())||(jq(".item-list-tabs ul #activity-favorites").hasClass("selected")&&bp_activity_request(null,null),jq(".item-list-tabs ul #activity-favorites").remove())),"activity-favorites"===jq(".item-list-tabs li.selected").attr("id")&&p.closest(".activity-item").slideUp(100)}),!1):p.hasClass("delete-activity")?(s=p.parents("div.activity ul li"),n=s.attr("id").substr(9,s.attr("id").length),o=p.attr("href"),r=o.split("_wpnonce="),l=s.prop("class").match(/date-recorded-([0-9]+)/),r=r[1],p.addClass("loading"),jq.post(ajaxurl,{action:"delete_activity",cookie:bp_get_cookies(),id:n,_wpnonce:r},function(e){e[0]+e[1]==="-1"?(s.prepend(e.substr(2,e.length)),s.children("#message").hide().fadeIn(300)):(s.slideUp(300),l&&activity_last_recorded===l[1]&&(newest_activities="",activity_last_recorded=0))}),!1):p.hasClass("spam-activity")?(s=p.parents("div.activity ul li"),l=s.prop("class").match(/date-recorded-([0-9]+)/),p.addClass("loading"),jq.post(ajaxurl,{action:"bp_spam_activity",cookie:encodeURIComponent(document.cookie),id:s.attr("id").substr(9,s.attr("id").length),_wpnonce:p.attr("href").split("_wpnonce=")[1]},function(e){e[0]+e[1]==="-1"?(s.prepend(e.substr(2,e.length)),s.children("#message").hide().fadeIn(300)):(s.slideUp(300),l&&activity_last_recorded===l[1]&&(newest_activities="",activity_last_recorded=0))}),!1):p.parent().hasClass("load-more")?(bp_ajax_request&&bp_ajax_request.abort(),jq("#buddypress li.load-more").addClass("loading"),jq.cookie("bp-activity-oldestpage")||jq.cookie("bp-activity-oldestpage",1,{path:"/",secure:"https:"===window.location.protocol}),c=1*jq.cookie("bp-activity-oldestpage")+1,d=[],jq(".activity-list li.just-posted").each(function(){d.push(jq(this).attr("id").replace("activity-",""))}),load_more_args={action:"activity_get_older_updates",cookie:bp_get_cookies(),page:c,exclude_just_posted:d.join(",")},load_more_search=bp_get_querystring("s"),load_more_search&&(load_more_args.search_terms=load_more_search),bp_ajax_request=jq.post(ajaxurl,load_more_args,function(e){jq("#buddypress li.load-more").removeClass("loading"),jq.cookie("bp-activity-oldestpage",c,{path:"/",secure:"https:"===window.location.protocol}),jq("#buddypress ul.activity-list").append(e.contents),p.parent().hide()},"json"),!1):void(p.parent().hasClass("load-newest")&&(e.preventDefault(),p.parent().hide(),activity_html=jq.parseHTML(newest_activities),jq.each(activity_html,function(e,t){"LI"===t.nodeName&&jq(t).hasClass("just-posted")&&jq("#"+jq(t).attr("id")).length&&jq("#"+jq(t).attr("id")).remove()}),jq("#buddypress ul.activity-list").prepend(newest_activities),newest_activities=""))}),jq("div.activity").on("click",".activity-read-more a",function(e){var t,i,a=jq(e.target),s=a.parent().attr("id").split("-"),n=s[3],o=s[0];return t="acomment"===o?"acomment-content":"activity-inner",i=jq("#"+o+"-"+n+" ."+t+":first"),jq(a).addClass("loading"),jq.post(ajaxurl,{action:"get_single_activity_content",activity_id:n},function(e){jq(i).slideUp(300).html(e).slideDown(300)}),!1}),jq("form.ac-form").hide(),jq(".activity-comments").length&&bp_legacy_theme_hide_comments(),jq("div.activity").on("click",function(e){var t,i,a,s,n,o,r,l,c,d,p,u,h,m,j,v=jq(e.target);return v.hasClass("acomment-reply")||v.parent().hasClass("acomment-reply")?(v.parent().hasClass("acomment-reply")&&(v=v.parent()),t=v.attr("id"),i=t.split("-"),a=i[2],s=v.attr("href").substr(10,v.attr("href").length),(n=jq("#ac-form-"+a)).css("display","none"),n.removeClass("root"),jq(".ac-form").hide(),n.children("div").each(function(){jq(this).hasClass("error")&&jq(this).hide()}),"comment"!==i[1]?jq("#acomment-"+s).append(n):jq("#activity-"+a+" .activity-comments").append(n),n.parent().hasClass("activity-comments")&&n.addClass("root"),n.slideDown(200),jq.scrollTo(n,500,{offset:-100,easing:"swing"}),jq("#ac-form-"+i[2]+" textarea").focus(),!1):"ac_form_submit"===v.attr("name")?(n=v.parents("form"),o=n.parent(),r=n.attr("id").split("-"),l=o.hasClass("activity-comments")?r[2]:o.attr("id").split("-")[1],content=jq("#"+n.attr("id")+" textarea"),jq("#"+n.attr("id")+" div.error").hide(),v.addClass("loading").prop("disabled",!0),content.addClass("loading").prop("disabled",!0),c={action:"new_activity_comment",cookie:bp_get_cookies(),_wpnonce_new_activity_comment:jq("#_wpnonce_new_activity_comment").val(),comment_id:l,form_id:r[2],content:content.val()},(d=jq("#_bp_as_nonce_"+l).val())&&(c["_bp_as_nonce_"+l]=d),jq.post(ajaxurl,c,function(e){if(v.removeClass("loading"),content.removeClass("loading"),e[0]+e[1]==="-1")n.append(jq(e.substr(2,e.length)).hide().fadeIn(200));else{var t=n.parent();n.fadeOut(200,function(){0===t.children("ul").length&&(t.hasClass("activity-comments")?t.prepend("<ul></ul>"):t.append("<ul></ul>"));var i=jq.trim(e);t.children("ul").append(jq(i).hide().fadeIn(200)),n.children("textarea").val(""),t.parent().addClass("has-comments")}),jq("#"+n.attr("id")+" textarea").val(""),u=Number(jq("#activity-"+r[2]+" a.acomment-reply span").html())+1,jq("#activity-"+r[2]+" a.acomment-reply span").html(u),(p=t.parents(".activity-comments").find(".show-all a"))&&p.html(BP_DTheme.show_x_comments.replace("%d",u))}jq(v).prop("disabled",!1),jq(content).prop("disabled",!1)}),!1):v.hasClass("acomment-delete")?(h=v.attr("href"),m=v.parent().parent(),n=m.parents("div.activity-comments").children("form"),j=h.split("_wpnonce="),j=j[1],l=h.split("cid="),l=l[1].split("&"),l=l[0],v.addClass("loading"),jq(".activity-comments ul .error").remove(),m.parents(".activity-comments").append(n),jq.post(ajaxurl,{action:"delete_activity_comment",cookie:bp_get_cookies(),_wpnonce:j,id:l},function(e){if(e[0]+e[1]==="-1")m.prepend(jq(e.substr(2,e.length)).hide().fadeIn(200));else{var t,i,a,s=jq("#"+m.attr("id")+" ul").children("li"),n=0;jq(s).each(function(){jq(this).is(":hidden")||n++}),m.fadeOut(200,function(){m.remove()}),i=(t=jq("#"+m.parents("#activity-stream > li").attr("id")+" a.acomment-reply span")).html()-(1+n),t.html(i),(a=m.parents(".activity-comments").find(".show-all a"))&&a.html(BP_DTheme.show_x_comments.replace("%d",i)),0===i&&jq(m.parents("#activity-stream > li")).removeClass("has-comments")}}),!1):v.hasClass("spam-activity-comment")?(h=v.attr("href"),m=v.parent().parent(),v.addClass("loading"),jq(".activity-comments ul div.error").remove(),m.parents(".activity-comments").append(m.parents(".activity-comments").children("form")),jq.post(ajaxurl,{action:"bp_spam_activity_comment",cookie:encodeURIComponent(document.cookie),_wpnonce:h.split("_wpnonce=")[1],id:h.split("cid=")[1].split("&")[0]},function(e){if(e[0]+e[1]==="-1")m.prepend(jq(e.substr(2,e.length)).hide().fadeIn(200));else{var t,i=jq("#"+m.attr("id")+" ul").children("li"),a=0;jq(i).each(function(){jq(this).is(":hidden")||a++}),m.fadeOut(200),t=m.parents("#activity-stream > li"),jq("#"+t.attr("id")+" a.acomment-reply span").html(jq("#"+t.attr("id")+" a.acomment-reply span").html()-(1+a))}}),!1):v.parent().hasClass("show-all")?(v.parent().addClass("loading"),setTimeout(function(){v.parent().parent().children("li").fadeIn(200,function(){v.parent().remove()})},600),!1):v.hasClass("ac-reply-cancel")?(jq(v).closest(".ac-form").slideUp(200),!1):void 0}),jq(document).keydown(function(e){(e=e||window.event).target?element=e.target:e.srcElement&&(element=e.srcElement),3===element.nodeType&&(element=element.parentNode),!0!==e.ctrlKey&&!0!==e.altKey&&!0!==e.metaKey&&27===(e.keyCode?e.keyCode:e.which)&&"TEXTAREA"===element.tagName&&jq(element).hasClass("ac-input")&&jq(element).parent().parent().parent().slideUp(200)}),jq(".dir-search, .groups-members-search").on("click",function(e){if(!jq(this).hasClass("no-ajax")){var t,i,a,s,n=jq(e.target);return"submit"===n.attr("type")?(t=jq(".item-list-tabs li.selected").attr("id").split("-"),i=t[0],a=null,s=n.parent().find("#"+i+"_search").val(),"groups-members-search"===e.currentTarget.className&&(i="group_members",a="groups/single/members"),bp_filter_request(i,jq.cookie("bp-"+i+"-filter"),jq.cookie("bp-"+i+"-scope"),"div."+i,s,1,jq.cookie("bp-"+i+"-extras"),null,a),!1):void 0}}),jq("div.item-list-tabs").on("click",function(e){if(jq("body").hasClass("type")&&jq("body").hasClass("directory")&&jq(this).addClass("no-ajax"),!jq(this).hasClass("no-ajax")&&!jq(e.target).hasClass("no-ajax")){var t,i,a,s,n,o="SPAN"===e.target.nodeName?e.target.parentNode:e.target,r=jq(o).parent();return"LI"!==r[0].nodeName||r.hasClass("last")?void 0:(t=r.attr("id").split("-"),"activity"!==(i=t[0])&&(a=t[1],s=jq("#"+i+"-order-select select").val(),n=jq("#"+i+"_search").val(),bp_filter_request(i,s,a,"div."+i,n,1,jq.cookie("bp-"+i+"-extras")),!1))}}),jq("li.filter select").change(function(){var e,t,i,a,s,n,o,r;return e=jq(jq(".item-list-tabs li.selected").length?".item-list-tabs li.selected":this),t=e.attr("id").split("-"),i=t[0],a=t[1],s=jq(this).val(),n=!1,o=null,jq(".dir-search input").length&&(n=jq(".dir-search input").val()),(r=jq(".groups-members-search input")).length&&(n=r.val(),i="members",a="groups"),"members"===i&&"groups"===a&&(i="group_members",o="groups/single/members"),"friends"===i&&(i="members"),bp_filter_request(i,s,a,"div."+i,n,1,jq.cookie("bp-"+i+"-extras"),null,o),!1}),jq("#buddypress").on("click",function(e){var t,i,a,s,n,o,r,l,c,d=jq(e.target);return!!d.hasClass("button")||(d.parent().parent().hasClass("pagination")&&!d.parent().parent().hasClass("no-ajax")?!d.hasClass("dots")&&!d.hasClass("current")&&(t=jq(jq(".item-list-tabs li.selected").length?".item-list-tabs li.selected":"li.filter select"),i=t.attr("id").split("-"),a=i[0],s=!1,n=jq(d).closest(".pagination-links").attr("id"),o=null,jq("div.dir-search input").length&&(s=!(s=jq(".dir-search input")).val()&&bp_get_querystring(s.attr("name"))?jq(".dir-search input").prop("placeholder"):s.val()),r=jq(d).hasClass("next")||jq(d).hasClass("prev")?jq(".pagination span.current").html():jq(d).html(),r=Number(r.replace(/\D/g,"")),jq(d).hasClass("next")?r++:jq(d).hasClass("prev")&&r--,(l=jq(".groups-members-search input")).length&&(s=l.val(),a="members"),"members"===a&&"groups"===i[1]&&(a="group_members",o="groups/single/members"),"admin"===a&&jq("body").hasClass("membership-requests")&&(a="requests"),c=-1!==n.indexOf("pag-bottom")?"pag-bottom":null,bp_filter_request(a,jq.cookie("bp-"+a+"-filter"),jq.cookie("bp-"+a+"-scope"),"div."+a,s,r,jq.cookie("bp-"+a+"-extras"),c,o),!1):void 0)}),jq("#send-invite-form").on("click","#invite-list input",function(){var e,t,i=jq("#send-invite-form > .invite").length;jq(".ajax-loader").toggle(),i&&jq(this).parents("ul").find("input").prop("disabled",!0),e=jq(this).val(),t=!0===jq(this).prop("checked")?"invite":"uninvite",i||jq(".item-list-tabs li.selected").addClass("loading"),jq.post(ajaxurl,{action:"groups_invite_user",friend_action:t,cookie:bp_get_cookies(),_wpnonce:jq("#_wpnonce_invite_uninvite_user").val(),friend_id:e,group_id:jq("#group_id").val()},function(a){jq("#message")&&jq("#message").hide(),i?bp_filter_request("invite","bp-invite-filter","bp-invite-scope","div.invite",!1,1,"","",""):(jq(".ajax-loader").toggle(),"invite"===t?jq("#friend-list").append(a):"uninvite"===t&&jq("#friend-list li#uid-"+e).remove(),jq(".item-list-tabs li.selected").removeClass("loading"))})}),jq("#send-invite-form").on("click","a.remove",function(){var e=jq("#send-invite-form > .invite").length,t=jq(this).attr("id");return jq(".ajax-loader").toggle(),t=t.split("-"),t=t[1],jq.post(ajaxurl,{action:"groups_invite_user",friend_action:"uninvite",cookie:bp_get_cookies(),_wpnonce:jq("#_wpnonce_invite_uninvite_user").val(),friend_id:t,group_id:jq("#group_id").val()},function(i){e?bp_filter_request("invite","bp-invite-filter","bp-invite-scope","div.invite",!1,1,"","",""):(jq(".ajax-loader").toggle(),jq("#friend-list #uid-"+t).remove(),jq("#invite-list #f-"+t).prop("checked",!1))}),!1}),jq(".visibility-toggle-link").on("click",function(e){e.preventDefault(),jq(this).attr("aria-expanded","true").parent().hide().addClass("field-visibility-settings-hide").siblings(".field-visibility-settings").show().addClass("field-visibility-settings-open")}),jq(".field-visibility-settings-close").on("click",function(e){e.preventDefault(),jq(".visibility-toggle-link").attr("aria-expanded","false");var t=jq(this).parent(),i=t.find("input:checked").parent().text();t.hide().removeClass("field-visibility-settings-open").siblings(".field-visibility-settings-toggle").children(".current-visibility-level").text(i).end().show().removeClass("field-visibility-settings-hide")}),jq("#profile-edit-form input:not(:submit), #profile-edit-form textarea, #profile-edit-form select, #signup_form input:not(:submit), #signup_form textarea, #signup_form select").change(function(){var e=!0;jq("#profile-edit-form input:submit, #signup_form input:submit").on("click",function(){e=!1}),window.onbeforeunload=function(t){if(e)return BP_DTheme.unsaved_changes}}),jq("#friend-list a.accept, #friend-list a.reject").on("click",function(){var e,t=jq(this),i=jq(this).parents("#friend-list li"),a=jq(this).parents("li div.action"),s=i.attr("id").substr(11,i.attr("id").length),n=t.attr("href").split("_wpnonce=")[1];return!jq(this).hasClass("accepted")&&!jq(this).hasClass("rejected")&&(jq(this).hasClass("accept")?(e="accept_friendship",a.children("a.reject").css("visibility","hidden")):(e="reject_friendship",a.children("a.accept").css("visibility","hidden")),t.addClass("loading"),jq.post(ajaxurl,{action:e,cookie:bp_get_cookies(),id:s,_wpnonce:n},function(e){t.removeClass("loading"),e[0]+e[1]==="-1"?(i.prepend(e.substr(2,e.length)),i.children("#message").hide().fadeIn(200)):t.fadeOut(100,function(){jq(this).hasClass("accept")?(a.children("a.reject").hide(),jq(this).html(BP_DTheme.accepted).contents().unwrap()):(a.children("a.accept").hide(),jq(this).html(BP_DTheme.rejected).contents().unwrap())})}),!1)}),jq("#members-dir-list, #members-group-list, #item-header").on("click",".friendship-button a",function(){jq(this).parent().addClass("loading");var e=jq(this).attr("id"),t=jq(this).attr("href"),i=jq(this);return e=e.split("-"),e=e[1],t=t.split("?_wpnonce="),t=t[1].split("&"),t=t[0],jq.post(ajaxurl,{action:"addremove_friend",cookie:bp_get_cookies(),fid:e,_wpnonce:t},function(e){var t=i.attr("rel");parentdiv=i.parent(),"add"===t?jq(parentdiv).fadeOut(200,function(){parentdiv.removeClass("add_friend"),parentdiv.removeClass("loading"),parentdiv.addClass("pending_friend"),parentdiv.fadeIn(200).html(e)}):"remove"===t&&jq(parentdiv).fadeOut(200,function(){parentdiv.removeClass("remove_friend"),parentdiv.removeClass("loading"),parentdiv.addClass("add"),parentdiv.fadeIn(200).html(e)})}),!1}),jq("#buddypress").on("click",".group-button .leave-group",function(){if(!1===confirm(BP_DTheme.leave_group_confirm))return!1}),jq("#groups-dir-list").on("click",".group-button a",function(){var e=jq(this).parent().attr("id"),t=jq(this).attr("href"),i=jq(this);return e=e.split("-"),e=e[1],t=t.split("?_wpnonce="),t=t[1].split("&"),t=t[0],(!i.hasClass("leave-group")||!1!==confirm(BP_DTheme.leave_group_confirm))&&(jq.post(ajaxurl,{action:"joinleave_group",cookie:bp_get_cookies(),gid:e,_wpnonce:t},function(e){var t=i.parent();jq("body.directory").length?jq(t).fadeOut(200,function(){t.fadeIn(200).html(e);var a=jq("#groups-personal span"),s=1;i.hasClass("leave-group")?(t.hasClass("hidden")&&t.closest("li").slideUp(200),s=0):i.hasClass("request-membership")&&(s=!1),a.length&&!1!==s&&(s?a.text(1+(a.text()>>0)):a.text((a.text()>>0)-1))}):window.location.reload()}),!1)}),jq("#groups-list li.hidden").each(function(){"none"===jq(this).css("display")&&jq(this).css("cssText","display: list-item !important")}),jq("#buddypress").on("click",".pending",function(){return!1}),jq("body").hasClass("register")){var a=jq("#signup_with_blog");a.prop("checked")||jq("#blog-details").toggle(),a.change(function(){jq("#blog-details").toggle()})}jq(".message-search").on("click",function(e){if(!jq(this).hasClass("no-ajax")){var t,i=jq(e.target);return"submit"===i.attr("type")||"button"===i.attr("type")?(t="messages",bp_filter_request(t,jq.cookie("bp-"+t+"-filter"),jq.cookie("bp-"+t+"-scope"),"div."+t,jq("#messages_search").val(),1,jq.cookie("bp-"+t+"-extras")),!1):void 0}}),jq("#send_reply_button").click(function(){var e=jq("#messages_order").val()||"ASC",t=jq("#message-recipients").offset(),i=jq("#send_reply_button");return jq(i).addClass("loading").prop("disabled",!0),jq.post(ajaxurl,{action:"messages_send_reply",cookie:bp_get_cookies(),_wpnonce:jq("#send_message_nonce").val(),content:jq("#message_content").val(),send_to:jq("#send_to").val(),subject:jq("#subject").val(),thread_id:jq("#thread_id").val()},function(a){a[0]+a[1]==="-1"?jq("#send-reply").prepend(a.substr(2,a.length)):(jq("#send-reply #message").remove(),jq("#message_content").val(""),"ASC"===e?jq("#send-reply").before(a):(jq("#message-recipients").after(a),jq(window).scrollTop(t.top)),jq(".new-message").hide().slideDown(200,function(){jq(".new-message").removeClass("new-message")})),jq(i).removeClass("loading").prop("disabled",!1)}),!1}),jq("body.messages #item-body div.messages").on("change","#message-type-select",function(){var e=this.value,t=jq('td input[type="checkbox"]'),i="checked";switch(t.each(function(e){t[e].checked=""}),e){case"unread":t=jq('tr.unread td input[type="checkbox"]');break;case"read":t=jq('tr.read td input[type="checkbox"]');break;case"":i=""}t.each(function(e){t[e].checked=i})}),jq("#select-all-messages").click(function(e){this.checked?jq(".message-check").each(function(){this.checked=!0}):jq(".message-check").each(function(){this.checked=!1})}),jq("#messages-bulk-manage").attr("disabled","disabled"),jq("#messages-select").on("change",function(){jq("#messages-bulk-manage").attr("disabled",jq(this).val().length<=0)}),starAction=function(){var e=jq(this);return jq.post(ajaxurl,{action:"messages_star",message_id:e.data("message-id"),star_status:e.data("star-status"),nonce:e.data("star-nonce"),bulk:e.data("star-bulk")},function(t){1===parseInt(t,10)&&("unstar"===e.data("star-status")?(e.data("star-status","star"),e.removeClass("message-action-unstar").addClass("message-action-star"),e.find(".bp-screen-reader-text").text(BP_PM_Star.strings.text_star),1===BP_PM_Star.is_single_thread?e.attr("data-bp-tooltip",BP_PM_Star.strings.title_star):e.attr("data-bp-tooltip",BP_PM_Star.strings.title_star_thread)):(e.data("star-status","unstar"),e.removeClass("message-action-star").addClass("message-action-unstar"),e.find(".bp-screen-reader-text").text(BP_PM_Star.strings.text_unstar),1===BP_PM_Star.is_single_thread?e.attr("data-bp-tooltip",BP_PM_Star.strings.title_unstar):e.attr("data-bp-tooltip",BP_PM_Star.strings.title_unstar_thread)))}),!1},jq("#message-threads").on("click","td.thread-star a",starAction),jq("#message-thread").on("click",".message-star-actions a",starAction),jq("#message-threads td.bulk-select-check :checkbox").on("change",function(){var e=jq(this),t=e.closest("tr").find(".thread-star a");e.prop("checked")?"unstar"===t.data("star-status")?BP_PM_Star.star_counter++:BP_PM_Star.unstar_counter++:"unstar"===t.data("star-status")?BP_PM_Star.star_counter--:BP_PM_Star.unstar_counter--,BP_PM_Star.star_counter>0&&0===parseInt(BP_PM_Star.unstar_counter,10)?jq('option[value="star"]').hide():jq('option[value="star"]').show(),BP_PM_Star.unstar_counter>0&&0===parseInt(BP_PM_Star.star_counter,10)?jq('option[value="unstar"]').hide():jq('option[value="unstar"]').show()}),jq("#select-all-notifications").click(function(e){this.checked?jq(".notification-check").each(function(){this.checked=!0}):jq(".notification-check").each(function(){this.checked=!1})}),jq("#notification-bulk-manage").attr("disabled","disabled"),jq("#notification-select").on("change",function(){jq("#notification-bulk-manage").attr("disabled",jq(this).val().length<=0)}),jq("#close-notice").on("click",function(){return jq(this).addClass("loading"),jq("#sidebar div.error").remove(),jq.post(ajaxurl,{action:"messages_close_notice",notice_id:jq(".notice").attr("rel").substr(2,jq(".notice").attr("rel").length),nonce:jq("#close-notice-nonce").val()},function(e){jq("#close-notice").removeClass("loading"),e[0]+e[1]==="-1"?(jq(".notice").prepend(e.substr(2,e.length)),jq("#sidebar div.error").hide().fadeIn(200)):jq(".notice").slideUp(100)}),!1}),jq("#wp-admin-bar ul.main-nav li, #nav li").mouseover(function(){jq(this).addClass("sfhover")}),jq("#wp-admin-bar ul.main-nav li, #nav li").mouseout(function(){jq(this).removeClass("sfhover")}),jq("#wp-admin-bar-logout, a.logout").on("click",function(){jq.removeCookie("bp-activity-scope",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-activity-filter",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-activity-oldestpage",{path:"/",secure:"https:"===window.location.protocol});var e=["members","groups","blogs","forums"];jq(e).each(function(t){jq.removeCookie("bp-"+e[t]+"-scope",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-"+e[t]+"-filter",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-"+e[t]+"-extras",{path:"/",secure:"https:"===window.location.protocol})})}),jq("body").hasClass("no-js")&&jq("body").attr("class",jq("body").attr("class").replace(/no-js/,"js")),"undefined"!=typeof wp&&void 0!==wp.heartbeat&&void 0!==BP_DTheme.pulse&&(wp.heartbeat.interval(Number(BP_DTheme.pulse)),jq.fn.extend({"heartbeat-send":function(){return this.bind("heartbeat-send.buddypress")}}));var s=0;jq(document).on("heartbeat-send.buddypress",function(e,t){s=0,jq("#buddypress ul.activity-list li").first().prop("id")&&(timestamp=jq("#buddypress ul.activity-list li").first().prop("class").match(/date-recorded-([0-9]+)/),timestamp&&(s=timestamp[1])),(0===activity_last_recorded||Number(s)>activity_last_recorded)&&(activity_last_recorded=Number(s)),t.bp_activity_last_recorded=activity_last_recorded,last_recorded_search=bp_get_querystring("s"),last_recorded_search&&(t.bp_activity_last_recorded_search_terms=last_recorded_search)}),jq(document).on("heartbeat-tick",function(e,t){t.bp_activity_newest_activities&&(newest_activities=t.bp_activity_newest_activities.activities+newest_activities,activity_last_recorded=Number(t.bp_activity_newest_activities.last_recorded),jq("#buddypress ul.activity-list li").first().hasClass("load-newest")||jq("#buddypress ul.activity-list").prepend('<li class="load-newest"><a href="#newest">'+BP_DTheme.newest+"</a></li>"))})});