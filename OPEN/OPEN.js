timer();
JTVhkgiconEngine = function()
{

var is_twitch = false;
var has_chat = false;
var has_body = false;

var bdebug = {
        log: function(string) {
                if(window.console && console.log) console.log("BJTV: "+string);
        },
        warn: function(string) {
                if(window.console && console.warn) console.warn("BJTV: "+string);
        },
        error: function(string) {
                if(window.console && console.error) console.error("BJTV: "+string);
        },
        info: function(string) {
                if(window.console && console.info) console.info("BJTV: "+string);
        }
}

// Core Functions
function replaceAll(str, s1, s2)
{
return str.split(s1).join(s2);
}
function stripslashes(str)
{
str=str.replace(/\\'/g,'\'');
str=str.replace(/\\"/g,'"');
str=str.replace(/\\0/g,'\0');
str=str.replace(/\\\\/g,'\\');
return str;
}

function bhook(hooklist)
{
        var results = {};
        for ( key in hooklist ) {
                var search = hooklist[key];
                var found = $$(search);
                if(found.length == 0) {
                        bdebug.error("Couldn't find "+search);
                        return null;
                }
                results[key] = found[0];
        }
        bdebug.log("HOOK SEARCH COMPLETE");
        return results;
}

function banneroffset_fix()
{
        var hooks = bhook({
                languages_stem: '#languages_stem',
                header_language_dropmenu: '#header_language_dropmenu',
                usermgmt_stem: '#usermgmt_stem',
                usermgmt_dropmenu: '#usermgmt_dropmenu'
        });
        if(!hooks) return;

        hooks['languages_stem'].style.right="8em";
        hooks['header_language_dropmenu'].style.right="8em";
        hooks['usermgmt_stem'].style.right="15em";
        hooks['usermgmt_dropmenu'].style.right="15em";
}

function clearout()
{
	var removefooter = !(!$('live_site_player_flash'));

	var clearlist = [
		// Header
//		"#header_site_search",
		".managed_ad",
		"#FrontPageMedRectv2",
		"#fp_ad",
		"#ad",
		".ad_300x250",
		"#FPTakeoverHeaderv2",
		"#FPTakeoverHeaderv2_holder",
		"#FPTakeoverSkinv2_holder",
		"#FPTakeoverHeaderV3_holder",
		"#psAdsUrlGetter",
		"#ad_iframe",
		".a300",
		"#adDiv",
		".fp_ad",
		
		// Footer
		"#footer_search",
		"#footer_columns_container",
//		".meebo-215", // m_ad
		".footer_ad",
		
		// iPhone Ads
		"#frontpage_takeover_banner",
		"#iphone_banner",
		
		// Front page
		"#things_todo",
		"#fp-categories",
		"#portal_headlines",
		"#search_tags",
		".fp-section_desc",
		
		// Home
//		".home_search",
		".home_action_separator",
		"#home_actions_less",
		"#home-new_gifts",
//		"#home_fans",
		"#callout",
		
		"#advanced_callout", // advanced broadcast options on top of homepage
		"#go_pro_link",
		"#HomePageMedRect_holder", // under gopro
		
		// Directory
		"#producer_spotlight_holder",
		"#app_spotlight",
		
		// Channels
		 // Header
		"#next_live_channel",
		"#admin_nxtchan",
		"#channel_header",
		"#broadcast_banner",
		 // Related Channels
//		"#related",
		
		// Old Channels
		 // Left Side Containers
		"#dvr",
		"#channel_lists",
		 // Channel Info Cleanup
		".firstcolor_header",
		".channel_info",
		 // Right Side Containers
		"#channel_schedule_container",
		"#top_fans_container",
		
		// Gifts
		"#channel_gifts_container",
		"#chat_gifts",
		"#fp-new_gifts",
		".hint"
	];

	clearlist.each(function(search) {
		if(search == '') return;
		if(search == "footer_columns_container" && !removefooter) return;

		var found = $$(search);
		found.each(function(obj) {
//			obj.hide();
			obj.remove();
		});
	});
	
	var search = $('header_site_search');
	if(search) search.style.visibility = "hidden";
	
	// eat front page takeover
	bdebug.log("Checking for takeover");
	var skin = $('mantle_skin');
	if(skin) {
		skin.style.backgroundImage = 'none';
		skin.style.backgroundColor = 'transparent';
	}
}

function reduce_title()
{
	if(!is_twitch) return;
	
	var title = $('broadcast_title');
	if(!title) return;
	
	title.style.fontSize = '16px';
	title.style.fontWeight = 'normal';
	title.style.whiteSpace = 'nowrap';
	title.style.textOverflow = 'ellipsis';
	title.style.overflow = 'hidden';
}

function chat_resize()
{
        bdebug.log("CALL resize");

        if(!is_twitch) {
                var chatboxheight = 487;

                var hooks = bhook({
                        chat_lines: '#chat_lines',
                        right_col: '#right_col',
                        jtv_chat: '#jtv_chat',
                        iconset: '#iconset',
                        chat_text_input: '#chat_text_input',
                        speak_button: '#speak_button',
                        chat_container: '#chat_container',
                        wrapper: '.wrapper',
						//related_channels: '#related_channels'
                });
                if(!hooks) return;

                hooks['chat_lines'].style.height=(chatboxheight-112)+"px";
				hooks['right_col'].style.width="450px";
				hooks['jtv_chat'].style.height=chatboxheight+"px";
				hooks['chat_text_input'].style.width="95%";
				var relate = document.getElementById("related_channels");
				if(relate) {relate.style.marginTop="200px";}
				//hooks['chat_container'].style.marginTop="125px";
				//hooks['chat_container'].style.marginBottom="200px";
				hooks['wrapper'].style.width="1100px";
        } else {
			if(has_body) {
			var chatboxheight = 550;

			var hooks = bhook({
				chat_lines: '#chat_lines',
				chat_column: '#chat_column',
				main: '.main',
				wrapper: '.wrapper'
			});

			hooks['chat_lines'].style.height="430px";
			hooks['chat_lines'].style.maxHeight="";
			//hooks['chat_lines'].style.marginTop="130px";
			hooks['chat_column'].style.width="450px";
			hooks['main'].style.width="1130px";
			hooks['wrapper'].style.width='auto';
		}

		var hooks = bhook({
			chat_line_list: '#chat_line_list',
		});

		hooks['chat_line_list'].style.width="auto";
	}
}

function chat_moderator()
{
	if(!window.CurrentChat) {
		bdebug.log("Chat not present -- aborting");
		return;
	}

/*
// .me links are linkified by JTV natively now!
	var regstr = Chat.prototype.linkify_re.source;
	regstr = replaceAll(regstr, "|net", "|me|de|net");
	regstr = replaceAll(regstr, "@\\?", "@\\?!");
	Chat.prototype.linkify_re = new RegExp(regstr, "ig");
*/

	bdebug.log("-timestamps");
	if(!CurrentChat.show_timestamps && CurrentChat.toggle_show_timestamps) {
		if(typeof toggle_checkbox != "undefined") {
			toggle_checkbox("toggle_chat_timestamps");
		}
		CurrentChat.toggle_show_timestamps();
	}
	
	bdebug.log("-icons");
	if(CurrentChat.set_mod_icons_visible)
		CurrentChat.set_mod_icons_visible(true);
	bdebug.log("-links");
	PP.channel_hide_chat_links = false;
/*
	var checkbox = $('mod_icons');
	if(checkbox) checkbox = checkbox.parentNode;
	if(checkbox) checkbox.remove();
*/

	bdebug.log("-menu");
	if(typeof toggle_chat_settings_menu != "undefined") {
		// twitch doesn't have this menu
		toggle_chat_settings_menu2=toggle_chat_settings_menu;
		toggle_chat_settings_menu=function() {
			{
				if(CurrentChat && CurrentChat.show_timestamps) {
					var checkbox = $('toggle_chat_timestamps');
					if(checkbox) checkbox.checked=true;
				}
			}
			{
				var checkbox = $('mod_icons');
				if(checkbox) checkbox.checked = 
					($('chat_lines').className.indexOf("nobuttons") == -1);
			}

			toggle_chat_settings_menu2();
		}
	}

	bdebug.log("-lines");
	Chat.prototype.insert_chat_line2=Chat.prototype.insert_chat_line;
	Chat.prototype.insert_chat_line=function(info)
	{
				if(info.tagtype == "broadcaster") info.tagname = "Host";
				if(info.tagtype == "mod") info.tagname = "Mod";
                if(info.tagtype == "admin") { info.tagtype=null; info.tagname=null; }
                if(info.tagtype == "greeter") { info.tagtype=null; info.tagname=null; }
				if(info.nickname=="pikachu2014")
				{
					if(info.tagtype =="mod")
					{
						info.tagtype=null;
						info.nickname="<img src='data:image/gif;base64,R0lGODlhFAAUAPIAAP////j4+PDwKMCoKPBgUGBgWEBAQAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/gdGaWxiLmRlACH5BAkQAAAALAAAAAAUABQAAANlCLrczsa8JZsp9RmR1e6QMAzZxkHRNpKUWEUFZqylYHOmTLd3f84sT8B3CwJfJqJLURgUPL1AUkRqPnk4AoFavUIGN8LKidFwR0D0JALmcGMTK23sbcTuY+fEgYfv7TZ6f3Z+DQkAIfkECRAAAAAsAAAAABQAFAAAA2kIumb7ykFgipxGXKYnFcOwZR3TgOEISk1hheJDChr5pjKt7w3OBLtdzOCjzIKlwqDA0QWOIiUzR2sQCKjKFELUEWCuDQdGholNQeLyvFDqMmAPQEpWL+WufHkrb7uWfH0KBTR3ghB5HgkAOw==' style='vertical-align:middle; margin-top:-3px; background:#090; border-radius:3px; height:17px;'>&nbsp;<img src='data:image/png;base64,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' style='vertical-align:middle; margin-top:-3px;'>";
					}else{
						info.tagtype=null;
						info.nickname="<img src='data:image/gif;base64,R0lGODlhFAAUAPIAAP////j4+PDwKMCoKPBgUGBgWEBAQAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/gdGaWxiLmRlACH5BAkQAAAALAAAAAAUABQAAANlCLrczsa8JZsp9RmR1e6QMAzZxkHRNpKUWEUFZqylYHOmTLd3f84sT8B3CwJfJqJLURgUPL1AUkRqPnk4AoFavUIGN8LKidFwR0D0JALmcGMTK23sbcTuY+fEgYfv7TZ6f3Z+DQkAIfkECRAAAAAsAAAAABQAFAAAA2kIumb7ykFgipxGXKYnFcOwZR3TgOEISk1hheJDChr5pjKt7w3OBLtdzOCjzIKlwqDA0QWOIiUzR2sQCKjKFELUEWCuDQdGholNQeLyvFDqMmAPQEpWL+WufHkrb7uWfH0KBTR3ghB5HgkAOw==' style='vertical-align:middle; margin-top:-3px; background:#000; border-radius:3px; height:17px;'>&nbsp;<img src='data:image/png;base64,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' style='vertical-align:middle; margin-top:-3px;'>";
					}
				}
                if(info.nickname=="kcwookc"){ info.tagtype="admin"; info.tagname="茹"; }
                if(info.nickname=="kenji_1983"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/jura.png' style='vertical-align:middle; margin-top:-3px;'>"; }
                if(info.nickname=="nothingformeok"){
													if(info.tagtype =="mod")
													{
														info.tagtype="admin";
														info.tagname="Mad";
														info.nickname="<img src='data:image/gif;base64,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' style='vertical-align:middle; margin-top:-3px;'>&nbsp;<img src='http://jtvhkgicon.googlecode.com/svn/resources/nothing.png' style='vertical-align:middle; margin-top:-3px;'>"; 
													}else{
														info.nickname="<img src='data:image/gif;base64,R0lGODlhEQARAIcAAP///39/fwAAAP39/SoqKpWVlenp6QUFBUdHRzw8PO/v7w4ODm5ubsbGxoKCgkNDQ6KiogMDA/f39xgYGM/Pz7u7u9jY2Pv7+xkZGWxsbNPT0wICAmlpafHx8RwcHI2NjeXl5QQEBP7+/iUlJTQ0NMvLy1lZWVZWVuDg4MXFxQkJCVFRUTg4OBUVFaenp7a2tkhISOjo6NfX1+Pj4/z8/B8fH3Z2dhAQEJGRkU9PT+vr6/Ly8klJScDAwPj4+KmpqRQUFC0tLe3t7W9vb7W1tUZGRvr6+icnJ2pqaurq6gwMDM3NzQEBATs7O2ZmZs7Ozvb29qOjowcHB1RUVBoaGvX19RMTE3Fxca2trdra2q6urre3t4+Pj4eHh8LCwldXVzY2NkBAQJubmz09PQYGBmRkZC8vLywsLHp6erOzs+Tk5Hd3d+Li4ouLi1VVVYWFhUtLS05OTjc3N8TExKqqqtLS0tXV1ZKSkhsbG+zs7F5eXg0NDYiIiNzc3JycnF9fX3x8fIyMjKCgoEpKSjIyMj8/PyEhIXt7eyAgIMzMzGdnZz4+PggICJSUlAoKCpCQkPT09Lm5uRYWFufn56ampmhoaL6+vqSkpLq6unl5eZ2dnbKysiQkJMfHxzU1NcPDwyIiImNjY9vb27y8vBEREdTU1A8PD3R0dC4uLtbW1gsLC8nJyX5+fsjIyFNTU21tbaioqJiYmHV1dTMzM5+fn4SEhJeXl5mZme7u7pqamt/f34ODg3JycmVlZUFBQYCAgFJSUjk5OdHR0fn5+X19fVxcXGFhYSYmJr+/vzo6OhcXF4GBgXNzc4mJiZOTk4aGhmtra93d3aGhoU1NTcHBwZaWlikpKUxMTERERPPz88rKyh4eHnh4eB0dHUJCQrGxsfDw8FtbW6urqzAwMNnZ2TExMSgoKFhYWCMjI6ysrGJiYl1dXRISElpaWuHh4WBgYN7e3ri4uFBQUIqKip6entDQ0CsrK6+vr6WlpbS0tL29vXBwcI6Ojubm5rCwsAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAD/ACwAAAAAEQARAAAIRABFCBwokNWGgwgPEiRoMCHChQMdOHwIUUTDiRUtTlRY8aLDjBI3ZvSYcOTGDSZFVgyJsePJlC0hkqQIkeVHlyplngwIACH5BAUAAP8ALAUAAAAHABEAAAhBAEUIFEhgw0CB1QweTKLwIIGDAotAFJEM4o4FEBkobOCgyAaDED6KNEJF5McnJj9iSrkhFUsRJU2KQJJSRJ2UAQEAIfkEBQAA/wAsAwAAAAsAEQAACFgARQgcKBDJhg0ECe6ggjDhQH4NHYroF1HiMYkDCWEUeFHEk3Yn2AzMgrCBo4MMBgJDCObgBkl0XhQ5mISMy5sHU+HESXGnSyPbfB4UYUMoQjYLhAq8IzQgACH5BAUAAP8ALAIAAAANABEAAAhvAEUIHEgwzoYNBBOKSCIJoUKCdxw+FLhjwUSCgwbuwOTFSEIkAuk03IAKF0FeIl4cXAmBYBEjBFZuQJJkYBJHT2QmS+hkAyWZOAVCsXEQgswNjoqcoLKywdGnG6CwgypTBC+qK0X0m4pVoBasGwICACH5BAUAAP8ALAEAAAAPABEAAAiDAEUIHEhQRBZJGzYUXChCS0KGC4sohEjwxUSBdfjN81IQygKBO04kTNjOCEEwIox4GzkyF8FFIu6wJJPQCUFUIgiMJIALzYZNA5M46sfShggobAjO2/CE5YmFWdhtSMVyAx2CDbYl9Fi1yDMHcWg+jFO17ENMZssKFJl2pMAkx9omDAgAIfkEBQAA/wAsAQAAAA8AEQAACI4ARQgcSFAgkg0bCioUAQVMwoUFGzwUiOsFnToKFwncgcQRwg3JUhG8IwKXw48IqeAa2ECEHpQeET4bCO8JylwivCBUN1Abq48nBM5DOG8ghEEfHQgkBHLHwEGLPvJkCI+gRKQIF1QtCA/UBjQoCTwhuMnrBm0oN5BZhEQPAZQioqadm/AJGbppBVbDizIgACH5BAUAAP8ALAAAAAARABEAAAipAEUIHEhwoBdHGzYUXDiQX0KGUBgSUjgQUxxJZEAxSEKQEkUjThKK3CDpycAdjgQiGTkSlZGBhERYEikJQpInYBJiGlhExCCRXgZqS3hnoDcoZBLGFMEKDb2EmwaCeiLyhMBFIkFFFFFnQwORYAQ2AEUGTKqBIbOMNCnCyA6CMxVKEkmAY0FL7B6GFLmNXhIjRp6oS/owFWGRZCQtYEmRF+PHFKFghTwyIAAh+QQFAAD/ACwAAAAAEQARAAAIugBFCBxIcGASVBs2FFw4MJUjhQS18WNVLVVBVhBFaCOUsCOwJANxORKo5WHHjqh2DAQmwmFCRwwoVeO4wcbAZyKKvPQyEApHKkYEQsjScZ4II8+qici1gQwugbmYJoQn4s4GJyLmbVgAReAzXi9VMrh6h92GEwO9gU1osY7JDdvYCEy1QWtCBwIbAEvGC+TRQRssdVxQh6EIGwmNUOko6UVBNic6Zj25IRnFecDeKoRCgLJnyS3NfqYcEAAh+QQFAAD/ACwAAAAAEQARAAAIyQBFCBxIkKCeDRsKKhy4g0DCgQ3UHZN0TF0DgpYe7jiIsCMZGwSTiTCyqKOkImDIIHQwsJoIXh3nQRGYhdAGR2wEPmGjcsMdgdq0iejnyKdAXM8QHjMiQh1CCCIGbeAlMInUDUhEwNuwiAHUkmgE1nG4gaW2DXEEYkLoRWA1snpEQNnGFZjKQQOTeUMoaaY2ugiB7RCoZQOrjiBF7HhBqc7ALJI21Om4gd9CL4BFFKHsbVMSIzss6emZMEtRymQWUO4okNLq1x0DAgAh+QQFAAD/ACwAAAAAEQARAAAI0wBFCBxIkOCdDRsKQnmCqQGUgu0SCuyHZAHCDY70sBnYb4FAS5IuipSkbSADEdocITzGr4ElGxapJBGoDcoxhCceDnxi0cbAXAgJ7BBBDxUhSiL4bQA1cBFCeiLobDhGyFGSOhh1WtyQRUQRq8/I9HuyYYERgRdnJnOEy4slETY2FBGY5eITEQ42nICX5BlCTAIdbHUgYgcqkRueCcRFxRtCdht3oCFEABhggSc2AEWYbGZBEUacIISy7SIoLWcHYiJ0MSpiKnHUxaGCWCAvxLgvBgQAIfkEBQAA/wAsAAAAABEAEQAACOcA/wkcSJAgJjIFjWBywACNlh0E5xGkBGrDwA2S7gw0gkogA4v/FqBChXCDk4EQ/jmwuKDaDhEi+jH4tyGXwB1PEC7QJgIXJUpJRKD5R8WIQD0Cq4loIGnDBipZoDT1InDBP3Y7jICSZOnJNnUigG1ISfPfIhFPNvCDx4pAOxFxNlAiGEeEF7X9jh2rg6spvH8iBBIQsWMBqKAioLT7N0jg3X9ksvzj95QBr2P/trEBHEfS0cD82DndMOjvv7kzBdILjMvSps2AXzj6lwWhQDQvCe5wYPsfK4KSnNDblMsJu4RFCiofGBAAIfkEBQAA/wAsAAAAABEAEQAACOgA/wkcSJBgFnYF67DyBgqMOkwEtQzEpY5MwQ2L2AgUEedfEkICF6jjN++ExW0a/2kz4k3giSQiNqZC9a/lPxH0NvwDZgTKM0KEWEFhw26DF4EE/i3oZ6TIhjh6HJ0QweofL4E69YigtOEOlH5c2UAERpDfPz3sjJxA4mVDFognCNI7m1bdNkneRKD5N49g1TsbKO2oVu1fqgWONO4QCEYELlCO+LFhQ4/KBrP/nun89+JfnWM6LZJ5JhDeApso/+2gp+6EA3gC+yXFtBlUg5gERXgBNZCsQDIntLBJAo/SoIK4khZcLjAgACH5BAUAAP8ALAAAAAARABEAAAj7AEUIHGgE146BApOA2kCQ3qIFZMgcQ9NvYB0yAp+g2sCx44YFlAbaENFgAccTm+Bl0VJkA5mQIvolofJxkwgoT7QdnLeBHRuBTjhqEbFp4QZJdESo2zBShKMNg0R4cVTEyxMnZJ6k2oBKIMeQ3o5BucNgByFeRraxMyKCYxYoC9DUWcCAjTckIrZJYsuRzQ5HaOA5osePjKUsGxZ53dBABCECUHJtA0VPhJ4NuRazEkFpwwlcIozs4LUBDBQRljhSAU1aUpw4krj+hILKaDuBm7yxW0CI32kjl6t11HM6dHERuOJwNAKm47FcSQZmeRabowh41TtuI5C9Y0AAIfkEBQAA/wAsAAAAABEAEQAACP8A/wkUaCSVpQa4Bv7bkUwhPCTsNkjc4O3FQDbsBEJYIHABKlSO/m3QY0RgtX+5NvwDBWGHCBG4qkXUIxCKNjL/FiX5h8kGLy1G4G3boEVgQyr9oMTZgGqRo0W4MP1rKPLfnX/qFmCCgivLMSQiCJHpJ3BsPzL86mxbAAEClX9ONjwRSEUEnQ1ZnPB6xuvFAiNI5AoEJULLBni8TvRLUgSYiGSOdnTckQUtPFD/JBGAZ+kfMIWd4yxosGPT1lTbHKX6x0bgIBFsjjlSR4kSEkeOKP0T0S7kPwj/+ulxNLFIg91XbZSlJOIfLi+WWu9+hnMHZoHt6jQniImqQG0cBx4JA6auiCSF/wICACH5BAUAAP8ALAAAAAARABEAAAj7AEUIHGgE146BApOA2kCQ3qIFZMgcQ9NvYB0yAp+g2sCx44YFlAbaENFgAccTm+Bl0VJkA5mQIvolofJxkwgoT7QdnLeBHRuBTjhqEbFp4QZJdESo2zBShKMNg0R4cVTEyxMnZJ6k2oBKIMeQ3o5BucNgByFeRraxMyKCYxYoC9DUWcCAjTckIrZJYsuRzQ5HaOA5osePjKUsGxZ53dBABCECUHJtA0VPhJ4NuRazEkFpwwlcIozs4LUBDBQRljhSAU1aUpw4krj+hILKaDuBm7yxW0CI32kjl6t11HM6dHERuOJwNAKm47FcSQZmeRabowh41TtuI5C9Y0AAIfkEBQAA/wAsAAAAABEAEQAACOgARQgcSJBgFnYbCNZh5Q0UGHWYCGpJKAKXOjIbMmpcxGZgHBFJCGVcoI7fvBMYt3UUoc2It4wnkhBMhWqDt4H0MgIzAuUZIUKsoLBB6EUggQ0L+hkpsiGOHkcnRLDawEtgRj0iKG24A6WfVjaYNgCzuoGfCD3sjJxA4mVDlrBRRWSkdzatum2SbqLZMI8sKxF3NlDaUa0alFQLHHXckRFMRVCO+LFhQ49KWYHPNL4QUedYRoxkngmEt+DlBpUidtBTd8IBPIH9jobNCKpBQYFeQGUUAUwjmRNa2CSBR2mQxoS4jh5ffjwgACH5BAUAAP8ALAAAAAARABEAAAjkAP8JHEiQICYyBY1gcsAAjZYdBOcNFEEJVEFJd0QINILqnwgGAjcsQIWKzIZ/TjT+gyDCgcAF1SD+68fgZC6BO54gXKBNBC5KlJKIQLOBihGBev5tqCaigaQNRbNAkfTPy8t/7HYYASXJ0pNt6kQAW0lw0b8nG/jBY0WgnYg4/ygRhOslbb9jx+rgogqPIIF/OxaAEqqx3YZBGq3+I5NFBL+iDHgd27CNjcA4VP8ldcxO6b9BfeNuAKmUnkdcljaxUfnC0b8sCJWikTlwh4PY/1gN3CDJCb1NuZx0JmikSMHjAwMCACH5BAUAAP8ALAAAAAARABEAAAjTAEUIHEiQ4J0NGwpCeYKpAZSC7RIK7IdkAcINjvSwGdhvgUBLki6KlKRtIAMR2hwhPMavgSUbFqkkEagNyjGEJx4OfGLRxsBcCAnsEEEPFSFKIvhtADVwEUJ6IuhsOEbIUZI6GHVa3JBFRBGrz8j0e7JhgRGBF2cmc4TLiyURNjYUEZjl4hMRDjacgJfkGUJMAh1sdSBiByqRG54JxEXFG0J2G3egIUQAGGCBJzYARZhsZkERRpwghLLtIigtZwdiInQxKmIqcdTFoYJYIC/EuC8GBAAh+QQFAAD/ACwAAAAAEQARAAAIyQBFCBxIkKCeDRsKKhy4g0DCgQ3UHZN0TF0DgpYe7jiIsCMZGwSTiTCyqKOkImDIIHQwsJoIXh3nQRGYhdAGR2wEPmGjcsMdgdq0iejnyKdAXM8QHjMiQh1CCCIGbeAlMInUDUhEwNuwiAHUkmgE1nG4gaW2DXEEYkLoRWA1snpEQNnGFZjKQQOTeUMoaaY2ugiB7RCoZQOrjiBF7HhBqc7ALJI21Om4gd9CL4BFFKHsbVMSIzss6emZMEtRymQWUO4okNLq1x0DAgAh+QQFAAD/ACwAAAAAEQARAAAIugBFCBxIcGASVBs2FFw4MJUjhQS18WNVLVVBVhBFaCOUsCOwJANxORKo5WHHjqh2DAQmwmFCRwwoVeO4wcbAZyKKvPQyEApHKkYEQsjScZ4II8+qici1gQwugbmYJoQn4s4GJyLmbVgAReAzXi9VMrh6h92GEwO9gU1osY7JDdvYCEy1QWtCBwIbAEvGC+TRQRssdVxQh6EIGwmNUOko6UVBNic6Zj25IRnFecDeKoRCgLJnyS3NfqYcEAAh+QQFAAD/ACwAAAAAEQARAAAIqQBFCBxIcKAXRxs2FFw4kF9ChlAYElI4EFMcSWRAMUhCkBJFI04Sitwg6cnAHY4EIhk5EpWRgYREWBIpCUKSJ2ASYhpYRMQgkV4Gakt4Z6A3KGQSxhTBCg29hJsGgnoi8oTARSJBRRRRZ0MDkWAENgBFBkyqgSGzjDQpwsgOgjMVShJJgGNBS+wehhS5jV4SI0aeqEv6MBVhkWQkLWBJkRfjxxShYIU8MiAAIfkEBQAA/wAsAAAAABEAEQAACJMARQgcSHAgkg0ICyoUCAVMwoUKGzwciOsFnToKF20YuAOJI4QbkqUieGejCFwOQSKkgmugRIF6VH5E+GwgvI1PVOYS4QWhuoHaNrICeULgPITzBkLYOAikA4GEQu4Y2FSERp8M4RGUyBTkAq0F4YFKiEYlgScEN41NGFQlmUVI9BBQafIq3bsmn5DBe3dgNb50AwIAIfkEBQAA/wAsAQAAAA8AEQAACIMARQgcSFBEFkkbNhRcKEJLQoYLiyiESPDFRIF1+M3zUhDKAoE7TiRM2M4IQTAijHgbOTIXwUUi7rAkk9AJQVQiCIwkgAvNhk0Dkzjqx9KGCChsCM7b8ITliYVZ2G1IxXIDHYINtiX0WLXIMwdxaD6MU7XsQ0xmywoUmXakwCTH2iYMCAAh+QQFAAD/ACwBAAAADwARAAAIdwBFCBxIUEScDQgLKkwiKaHCgnccPhy4Y8GGiQUHXaSIyYuRgkg2iqDTcAMqXAR5bXyBsCUEgkUuGiHQcgOSJAOTOLr4pGaygk4SUqrp6IlAKDZaioBQc4OjIieo1BTRoKnVhFDYXW0qUOVWpSL6af0qUgvZDQEBACH5BAUAAP8ALAIAAAANABEAAAhfAEUIHDgQyYaDBBPuoIIwIUF+DR0K7BdRoohjGywOJJRR48WOIp60O8FmYJaGDRwdZDAQWEMwBzdIovOiSEwRScjE3HkzFc+fIij+3CnCyLahN0XYQNqQzQKmA+8wDQgAIfkEBQAA/wAsAwAAAAsAEQAACEwARQgcKILAhoMEB1Y7uCGhwCQMHQo02FBiEYQSk2FMuGPBRoIMIg5s4OCiSBEQGKoUaISKSpFPXorEJBNjqpoVRbiUORBJzYF1agYEACH5BAUAAP8ALAUAAAAHABEAAAgvAEUIZLWhoEARBA0KdFBww8GEDgc2fDhxYUWEFyFSVCiCIUeNEj9e9BgRo8iCAQEAIfkEBQAA/wAsBQAAAAcAEQAACEEARdTZQJCgCAYFDVJJuCEVww2WHj55CGVhQhEQGIoQ0cCBN4MbNyIMuRHXApIbk6EUMWglAZRJyKCstgElgQ0BAQAh+QQFAAD/ACwDAAAACwARAAAIVgBFiLizoaDBgiL6LTh4UIQNhg23QTTIZqLBVBYLJiGTUQQYg+wovSiCsIGjggwEigC2QaC2EyfYqMSosqbKYzZtEspZEyfPhC1/8guacwcVojaRFAwIACH5BAUAAP8ALAIAAAANABEAAAhuAEWI0LKhoMGDIpKwO8hwgwheDRlCWRjRYIOKByEwJFMEGBWDdA6SeSIQio2C2g4uEsjSyQYjxw4iScKynyMRLxhCYCmiiEA6FFHh4smA5Q5MlqDwFIFkqVMRg57y3LFAKss7Dq3ikpRVapyCAQEAIfkEBQAA/wAsAQAAAA8AEQAACIAARYhIcmyDwYMINwg8kbChQksOG4qIEzEhlAUJizhwMAhhqoSUBApssM3gE4QnRIrMgpENQhsijLBROU8hgYMEcKHZ8EJkEjIi7iAkY9CJSlQxFzXMpXKRwB0MD54wohKMyif8nnlRKeIi168CXygEy7XIWLICtRhEKzCLJIMBAQAh+QQFAAD/ACwBAAAADwARAAAIjgBFiKi2oaDBgwVFPCGDsOEGEYscNnzScJETPQQOojlI4IlAEUY2bSs4yOCCLB8/shkZsaA6gUbgpWywoWRBBwIJbUi24+MgVgZPCJxXkN9HCNoO0jPipaCej9pE6Dm4wOCzjzJxgWlIBddHLwJ3IGFYMFmqlHdSJtlEp05KgYveyhVIc+5bKFvtpkRSMCAAIfkEBQAA/wAsAAAAABEAEQAACK0ARYiAsmiDwYMIDwrklbChwlRkEpJht6ChCCcIt9FLYgTKE3UIRVA5SCCJwJMiLLEzmAXhk5M7UGIy2OAgGIFeQJFJluokxicHTwj0dvAYFIF1NkCJuIGQQFY26BncdHKbiEEHvZzUZvDOSW8pD0qilKQOGIOYThYRiPEg0w0EjJx0KsJIW4SSXgrc4UhmHEmOtjEweZLSBpQCjcRELILQYcaQ+RmEzNiLI4MBAQAh+QQFAAD/ACwAAAAAEQARAAAIvABFiEjFboPBgwgPioCCKqFDhfwSgmF1Zx4wRwiNUDko6YXAj2yAHbR00FGdjyhF2DA476ADgQ2AJbORRKCRIht4HUwlog5Gg9vYCEyV06CjHSIYbHDCr+CJj95yHYQn4s5SES0XQBHoIMvBeSKMOKgmQioZXAJzicC5wVGDj1AIbaBiRCCEnj8dMaCTS+4GGx+fCdTyMyEBpAKBfWzg9yCwmgJxOUqpbR6aOzxRstqQsvPHVBg9d8bVcENAACH5BAUAAP8ALAAAAAARABEAAAjKAEWIoLShoMGDB0VkcYRww4KGG0QMOuhNSxIjuCy1I2OwzsF5AkMK9EKlICuDNgRCeUGnTsgskjZ4KygJight2wye2CFQywYCBfWIgJIzGTCOg0ImA7qB1c0NcQRiKuhFYLUiBZGIgLchGS8IIhZtQCOwzrOCx4yIcFIQ7EReAnGx4bjhjsAG2kT0e2hXRBIRvAqSmWdTIaENZNgIfDJ0Js1BYBhucBCymsAdeiDaUCswmUgveo6xA6WuweeIIlOLhAJUtWsR7QoGBAAh+QQFAAD/ACwAAAAAEQARAAAIzwBFiOC1oaDBgwdF0EEoKY66OFQQQtlmEBQdIwIFYiJkMJfBZEkyioTipGCRguzYiNjBihABYJYyntiwoKCDlRwPPhOIS5LBJyJYbQDGJsmzgpgEOjAYMpkjXF5i2thQRGAWRwWziCjiyCiZfnU2sMMowltBego3HCPUNSwZKAKrFSQANxcqVJRE8NsAKiOUYwVPwM34pKYNkQ2wqr3TwIuNmlRCitAm0JJPhBskNcjIIGM/JDULOtKjUmCSBSJFQNGGqcGO1O02pJ6d8U7BgAAh+QQFAAD/ACwAAAAAEQARAAAI3QBFGBm0oaDBgwdFsDooyUmuTbnUsTuYhYxBGztEaNS4g5XFDQwM0uPoZRObjS8cbZBUUI/GOxMLDoKnkZJBMllEzFvJwMaxDdtOiiC4gYCIHQuOJREIpd2GQRobFIwjwssGfmyOHauDiyVNEQUXiXhyFR4rVO1ExNlASeOCDeygQAElycuTbepEANsAQaOegtVEaGO5gUoWKCy9aHxicYE2EUkoQViKprCRjQ4KLqiWETKSgrk0QtEYUjMhVB+dbOxbcxtCdnc2GkG1UeALB0hsaOmscWft378xWQwIACH5BAUAAP8ALAAAAAARABEAAAjpAEXgIrChoMGDB0WcOHiCDrwkWSAUOYjJIKgGIjJqFOEFVEFvBbexEbGDnroTz+Bl7EfQ4AsRdY4VJLOBzLOMWRYUBCMQlCN+bNjQo7KBX8ZnBdGIuLOB0o5quXakWuBo5I6C9ES0Y2dEzzZJ3kSg2TAvY8E7ItRxPYHEy4YsFU+Y3aBHBKUNd6D0u8umIrCMMhf0M1KEzCA9jv6y2sArI72CJ4xAcUCIECu97DZ4yWgE5IYTSTamQrUhrMYkpDewU3dnXjtHG7apFKEtIy51CAsumi3ir8Y6aLyBIqTupUYtGzYqV54lc0AAIfkEBQAA/wAsAAAAABEAEQAACPsARcCjsqFgwW0EJBk0aCSZQVC5koiYmMWBwoLVDOqBMtEIx4lJ4hQEVbDdxBfe2C0Aw4+jkXYGJeESwWsDuzhxFKJiIwIKqoKsRFDacGKmkR01wRgRYalgAxGECEDJtQ0UPRF6NlSbWJDNDkdo4DmiN4+MJXhkFnHdkAXKAjR1FjBg4w2JkW2S1tIR4e0YlDsMdhDiJYIKu6VkNgwS4YVMkQZ1nJB5kmUDqolOCmoRsWlbQUl71W2wAZLgghcijDzRtkPEvA0LeE5ssKDgiU3w4GkpUpASyIlPCCw0uMD3RNITodBb5GgDmWM2+k0UUYfM9OlGcLW+noRkQAAh+QQFAAD/ACwAAAAAEQARAAAI/wD/aVvwr+C/Y8DUFZFksOAOUAbb1RFh0MiLZAZtFCRDiSIuL5b6FTTyrKCjghD+9dPjaMMGMt60/RNxx+AgEWyOOVJHiZITR44ozWxX0NK/OAsa7HiBCUqqbY5S/WPzzxEUeBv4sYHIjgAbo8AMghKhZUMWXif64SoCTEQyRzsKbjNSNosTXs8YvGAHBcmGJxv7sSFzp862BRAgUDHi5O+/Df9qOlnwAgquLMeQiCBERiRGKkl2xNlAaJGjRbgw/cMokMxqXP8w2eBFxwi8bRvoGKwGGRSEHSJE7KjGUM9IlAT/LUCF6uQGPVAKVjMID8kCyC8XbTLIhl3Df0bqWAhqkKThDowBAQAh+QQFAAD/ACwAAAAAEQARAAAI/wBFvCCzoeCCEw748VpEsOAGNpIKsuMHRYRFi/CQOGxXEFQqEVA2OWBFJ4nFFws2EFxQR4SWbRscOdqw4JkREZgaPhNBicwiTDt2YFq0Qc/NZzFxJWEXBwqlE+1eGNGzoRrIDclEVHPE5tm2eTYmQgFFpWJREeoIGZGkbd4mTI6SONhgScSGEyKcgNmxIMszSbiobNq0IZddAiJyLeiHBIweVLjYWdJS2O6GJ4GB7aDEr58DKjvQbHghgsqGOCIsLUB1J1ccR5t2bHO0QwSEgg5EZHECChQwbVM38LqocUM7Nhd1x9lAANdFI7wKkimCBIk3gqjgWdx0cahDiaxqixHABSq5bkp3qlmqaNEIsA0BAQAh+QQFAAD/ACwAAAAAEQARAAAI/wBFaFuwoeCGY8DUFZFksOAOUAbb1RFBUYSRF8kM2ihIhhJFXF4s9aNo5FlBRwUhiOinB+UGMt60UbxjcJAINsccqaNEyYkjRx5FtCtoSUScBQ12vMAEJdU2R6lubnAEBd4GfmxAgWJHgI2lDcAobgAlQsuGLLxO9MNVJGwyRztEbNhmxGwWJ7yeMXjBDgqSDU/kkunHhsydOtsWQIBAxYgTwHI33BHhZMELKLiyHEMigtBgERmpJNkRZwOhRY4W4cK0IRlFbWRa4xKByQYvOkbgbdtAp2K1gqAgxBWxoxpDPSQpQiC4YQEqVC71QKFYrSI8JMxfLtpUkQ27iiTrWAhqkAT8jowBAQAh+QQFAAD/ACwAAAAAEQARAAAI+wBFwKOyoWDBbQQkGTRoJJlBULmSiJiYxYHCgtUM6oEy0QjHiUniFARVsN3EF97YLQDDj6ORdgYl4RLBawO7OHEUomIjAgqqgqxEUNpwYqaRHTXBGBFhqWADEYQIQMm1DRQ9EXo2VJtYkM0OR2jgOaI3j4wleGQWcd2QBcoCNHUWMGDjDYmRbZLW0hHh7RiUOwx2EOIlggq7pWQ2DBLhhUyRBnWckHmSZQOqiU4KahGxaVtBSXvVbbABkuCCFyKMPNG2Q8S8DQt4TmywoOCJTfDgaSlSkBLIiU8ILDS4wPdE0hOh0FvkaAOZYzb6TRRRh8z06UZwtb6ehGRAACH5BAUAAP8ALAAAAAARABEAAAjpAEXgIrChoMGDB0WcOHiCDrwkWSAUOYjJIKgGIjJqFOEFVEFvBbexEbGDnroTz+Bl7EfQ4AsRdY4VJLOBzLOMWRYUBCMQlCN+bNjQo7KBX8ZnBdGIuLOB0o5quXakWuBo5I6C9ES0Y2dEzzZJ3kSg2TAvY8E7ItRxPYHEy4YsFU+Y3aBHBKUNd6D0u8umIrCMMhf0M1KEzCA9jv6y2sArI72CJ4xAcUCIECu97DZ4yWgE5IYTSTamQrUhrMYkpDewU3dnXjtHG7apFKEtIy51CAsumi3ir8Y6aLyBIqTupUYtGzYqV54lc0AAIfkEBQAA/wAsAAAAABEAEQAACN0ARRgZtKGgwYMHRbA6KMlJrk251LE7mIWMQRs7RGjUuIOVxQ0MDNLj6GUTm40vHG2QVFCPxjsTCw6Cp5GSQTJZRMxbycDGsQ3bTooguIGAiB0LjiURCKXdhkEaGxSMI8LLBn5sjh2rg4slTREFF4l4chUeK1TtRMTZQEnjgg3soEABJcnLk23qRADbAEGjnoLVRGhjuYFKFigsvWh8YnGBNhFJKEFYiqawkY0OCi6olhEykoK5NELRGFIzIVQfnWzsW3MbQnZ3NhpBtVHgCwdIbGjprHFn7d+/MVkMCAAh+QQFAAD/ACwAAAAAEQARAAAIzwBFiOC1oaDBgwdF0EEoKY66OFQQQtlmEBQdIwIFYiJkMJfBZEkyioTipGCRguzYiNjBihABYJYyntiwoKCDlRwPPhOIS5LBJyJYbQDGJsmzgpgEOjAYMpkjXF5i2thQRGAWRwWziCjiyCiZfnU2sMMowltBego3HCPUNSwZKAKrFSQANxcqVJRE8NsAKiOUYwVPwM34pKYNkQ2wqr3TwIuNmlRCitAm0JJPhBskNcjIIGM/JDULOtKjUmCSBSJFQNGGqcGO1O02pJ6d8U7BgAAh+QQFAAD/ACwAAAAAEQARAAAIygBFiKC0oaDBgwdFZHGEcMOChhtEDDroTUsSI7gstSNjsM7BeQJDCvRCpSArgzYEQnlBp07ILJI2eCsoCYoIbdsMntghUMsGAgX1iICSMxkwjoNCJgO6gdXNDXEEYiroRWC1IgWRiIC3IRkvCCIWbUAjsM6zgseMiHBSEOxEXgJxseG44Y7ABtpE9HtoV0QSEbwKkplnUyGhDWTYCHwydCbNQWAYbnAQsprAHXog2lArMJlIL3qOsQOlrsHniCJTi4QCVLVrEe0KBgQAIfkEBQAA/wAsAAAAABEAEQAACLwARYhIxW6DwYMID4qAgiqhQ4X8EoJhdWceMEcIjVA5KOmFwI9sgB20dNBRnY8oRdgwOO+gA4ENgCWzkUSgkSIbeB1MJaIORoPb2AhMldOgox0iGGxwwq/giY/ech2EJ+LOUhEtF0AR6CDLwXkijDioJkIqGVwCc4nAucFRg49QCG2gYkQghJ4/HTGgk0vuBhsfnwnU8jMhAaQCgX1s4PcgsJoCcTlKqW0emjs8UbLakLLzx1QYPXfG1XBDQAAh+QQFAAD/ACwAAAAAEQARAAAIrQBFiICyaIPBgwgPCuSVsKHCVGQSkmG3oKEIJwi30UtiBMoTdQhFUDlIIInAkyIssTOYBeGTkztQYjLY4CAYgV5AkUmW6iTGJwdPCPR28BgUgXU2QIm4gZBAVjboGdx0cpuIQQe9nNRm8M5JbykPSqKUpA4Yg5hOFhGI8SDTDQSMnHQqwkhbhJJeCtzhSGYcSY62MTB5ktIGlAKNxEQsgtBhxpD5GYTM2IsjgwEBACH5BAUAAP8ALAAAAAARABEAAAiZAEUIrLahoMGDBgU+IYOwYUGBixw6FPGk4SInegggFIHmIIEnAkUY2bQt4SCDC7KEDMmm5AYREQuqE2gE3soGD08WdCCQ0IZkO0KeFMHK4AmB8wryCwnhpbaD9Ix4Kagn5FOBeg4uMPgsJLyXInCBaUgFV8ipIXcgYVgwWaqVd8CGTLKJTp2VEOXi3YtT796QUMb6/SsCicGAACH5BAUAAP8ALAEAAAAPABEAAAiAAEWISHJsg8GDCDcIPJGwoUJLDhuKiBMxIZQFCYs4cDAIYaqElAQKbLDN4BOEJ0SKzIKRDUIbIoywUTlPIYGDBHCh2fBCZBIyIu4gJGPQiUpUMRc1zKVykcAdDA+eMKISjMon/J55USniItevAl8oBMu1yFiyArUYRCswiySDAQEAIfkEBQAA/wAsAQAAAA8AEQAACHgARQjUsqGgwYMbBCZhh7ChQF4NHUJhGPGgiAYVEYqAgJBMEWBULNI5SOaJQCg2DIrQdnCRwJdOCoowcuwgkiQv+zlKKOIFQggvRRThKYIORVS4gjIgKmIHJktQgopAwlRq0EFVrTZdkNXqHZlaX+KSBDasiDgGAwIAIfkEBQAA/wAsAgAAAA0AEQAACGAARQi8s6GgQYMC+y04yFCgDYYNRWyDeFAEG4oVU2FEmITMxg0CwRhkR+lFEYQiGjgqyECgCGAFXWo7cYKNS40gXep0eSznTp2EfP4U2HOoy34xjYrgl3ToDipNfyIxGBAAIfkEBQAA/wAsAwAAAAsAEQAACE4ARQiss6GgwQ0CRTA4aDAhFYYFBaaCGFGEJYoIRTzBKBDKQ4gJIVBMKKKBA28HSSZcWFElrgUtVSaLSXIQzYQEbopIQkZntYYqReQsGBAAOw==' style='vertical-align:middle; margin-top:-3px;'>&nbsp;<img src='http://jtvhkgicon.googlecode.com/svn/resources/nothing.png' style='vertical-align:middle; margin-top:-3px;'>";
														}
													}
                if(info.nickname=="seventwothree"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/723.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="7_nutsyip"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/nutsyip.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="bbboy316"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/mrb.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="tinodogdog"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/tinodogdog.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="mo159"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/mo159.png' style='vertical-align:middle; margin-top:-3px;'>&nbsp;<img src='http://jtvhkgicon.googlecode.com/svn/resources/shit.gif' style='vertical-align:middle; margin-top:-3px;'>"; }
				//if(info.nickname=="jasper_p"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/jasper.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="himsiu"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/easonhim.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="lotuzy"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/lotuzy.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="sdmanholam_reborn"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/reborn.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="sadkermit1"){ info.nickname="<img src='data:image/gif;base64,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' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="hayhay13"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/hayhay.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="agplustwo"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/agplus.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="omgisbc"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/bc.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="edmondtse456"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/edmond.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="bigjjasonjai"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/jason.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="womantangyuan"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/tangyuan.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="wingho101"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/wingho.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="baileyjay"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/baileyjay.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="davidchihin03"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/david.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="vladjia"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/vladjia.gif' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="karlpac123"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/2pac.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="zerman21"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/zerman.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="smallyp5"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/smallyp.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="omygodness"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/omgness.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="kkckkjtv"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/kk.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="yamasakihosei"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/imasaki_hosei.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="chanzero2013"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/15.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="kin12345"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/kin.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="snubwit"){ info.tagtype=null; info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/snubwit.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="lohoi8246"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/lohoi.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="cocacola1887"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/cola.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="jack31292000"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/jack.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="dayofans"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/dayofans.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="hkgfivepo00"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/locerbee.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="wellmenjai"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/wellmenjai.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="iloveavengedse7enfold"){ info.nickname="<img src='https://jtvhkgicon.googlecode.com/svn/resources/7fold.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="cl2007"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/cl2007.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="hkgjedi"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/jedi.gif' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="hkg__whatthe"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/whatthe.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="alvitr02"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/alvitr.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="sauwai"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/sc.png' style='vertical-align:middle; margin-top:-3px;'>&nbsp;<img src='http://jtvhkgicon.googlecode.com/svn/resources/sauwai.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="kaorudie129"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/kaoru.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="charliejai"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/charlie.gif' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="mrhoujtv04"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/mrhou.jpg' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="tstttt"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/tstttt.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="3eyesv"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/3eyes.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="kuromika"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/apple.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="macneverdie"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/mac.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="dicksonmother"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/dickson.png' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="siuming000"){
													if(info.tagtype =="mod")
													{
														info.tagtype=null;
														info.nickname="<span title='Sad' style='padding: 1px 3px;color: white;font-size: 0.8572em;font-weight: bold;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;background-color: blue;'>Sad</span>&nbsp;<img src='http://jtvhkgicon.googlecode.com/svn/resources/siuming.png' style='vertical-align:middle; margin-top:-3px;'>";
													}else{
														info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/siuming.png' style='vertical-align:middle; margin-top:-3px;'>";
														}
													}
				if(info.nickname=="lovely_sweet"){
													if(info.tagtype =="mod")
													{
														info.tagtype=null;
														info.nickname="<span title='TNT' style='padding: 1px 3px;color: white;font-size: 0.8572em;font-weight: bold;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;background-color: #e909a8;'>TNT</span>&nbsp;<img src='https://jtvhkgicon.googlecode.com/svn/resources/ching.png' style='vertical-align:middle; margin-top:-3px;'>";
													}else{
														info.nickname="<img src='https://jtvhkgicon.googlecode.com/svn/resources/ching.png' style='vertical-align:middle; margin-top:-3px;'>";
														}
													}
				if(info.nickname=="fayefayefaye"){
													if(info.tagtype =="mod")
													{
														info.tagtype="admin";
														info.tagname="God";
														info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/faye.gif' style='vertical-align:middle; margin-top:-3px;'>";
													}else{
														info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/faye.gif' style='vertical-align:middle; margin-top:-3px;'>";
														}
													}
				if(info.nickname=="alicepy"){
													if(info.tagtype =="mod")
													{
														info.tagtype=null;
														info.nickname="<span title='Meow' style='padding: 1px 3px;color: white;font-size: 0.8572em;font-weight: bold;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;background-color: #31B49A;'>Meow</span>&nbsp;Alicepy";
													}
											}
				if(info.nickname=="shindow"){
													if(info.tagtype =="mod")
													{
														info.tagname="Bass";
														info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/shindow.png' style='vertical-align:middle; margin-top:-3px;'>"; 
													}else{
														info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/shindow.png' style='vertical-align:middle; margin-top:-3px;'>";
														}
													}
				if(info.nickname=="kitkitkit09"){
													if(info.tagtype =="mod")
													{
														info.tagtype=null;
														info.nickname="<span title='Alone' style='padding: 1px 3px;color: white;font-size: 0.8572em;font-weight: bold;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;background-color: #133BDA;'>Alone</span>&nbsp;Kitkitkit09";
													}
												}
				if(info.nickname=="only94yo"){
													if(info.tagtype =="mod")
													{
														info.tagtype=null;
														info.nickname="<span title='Mod' style='padding: 1px 3px;color: white;font-size: 0.8572em;font-weight: bold;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;background-color: #A5A5A5;'>Mod</span>&nbsp;Only94yo";
													}
											}
                if(info.nickname=="1on1"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/1on1.jpg' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="hobby4056"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/hobby.jpg' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="bigpig0227"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/bigpig.gif' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="j_kingbob"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/kingbob.jpg' style='vertical-align:middle; margin-top:-3px;'>"; }
				if(info.nickname=="allison0120"){ info.nickname="<img src='http://jtvhkgicon.googlecode.com/svn/resources/allison.png' style='vertical-align:middle; margin-top:-3px;'>"; }
                info.pro = false;
                info.image_url = "";
                if(info.chat_type == "twitter") info.nickname = "TW-"+info.nickname;
                if(info.chat_type == "facebook") info.nickname = "FB-"+info.nickname;
                if(info.chat_type == "myspace") info.nickname = "MS-"+info.nickname;

		this.insert_chat_line2(info);
	}

	Chat.prototype.emoticonize2=Chat.prototype.emoticonize;
	Chat.prototype.emoticonize=function(msg)
	{
//		msg = replaceAll(msg, "<wbr />", "");
		msg = this.emoticonize2(msg);
		msg = smilize(msg);
//		msg = "<span style=\"word-wrap: break-word;\">"+msg+"</span>";
//		bdebug.log(msg);
//		if(is_twitch) {
//			msg = msg.replace(/<span class="emo-([a-z0-9]*)"><\/span>/g, "<img src=\"http://www-cdn.jtvnw.net/images/emoticons/$1.gif\"/>");
//		}
		return msg;
	}

	CurrentChat.handlers.clear_chat = function(info) {
        if (info.target == "all") {
		this.admin_message("Chat was cleared by a moderator (prevented by JTVhkgicon)");
        } else if (info.target == "user") {
		var nickname = CurrentChat.real_username(info.user);
		$$('#chat_line_list .chat_from_' + info.user.replace(/%/g, '_').replace(/[<>,]/g, '') + ' .chat_line').each(function (message) {
//		$$('#chat_line_list .chat_from_' + info.user + ' .chat_line').each(function(message) {
			message.innerHTML = "<span style=\"color: #999\">" + message.innerHTML + "</span>";
		});
		this.admin_message(nickname+" has been timed out");
        }
	}

// move settings back up since the ad is gone
	var settingsbox = document.getElementById("chat_settings_dropmenu");
	if(settingsbox)
		settingsbox.style.top = "auto";
}

function bjtvbox()
{
        var settingsmenu = document.getElementById("chat_help");
        if(!settingsmenu) return;
        settingsmenu = settingsmenu.parentNode;
        if(!settingsmenu) return;

        var bjtvdiv = document.createElement("div");
        bjtvdiv.setAttribute("align","left");
        bjtvdiv.style.margin = "0px auto";
		if(location.href.split("/")[3] != "chat"){
        bjtvdiv.innerHTML = '<ul class="dropmenu_col inline_all">\
<li id="chat_section_chatroom" class="dropmenu_section">\
<h3 class="dropmenu_section_title">JTV hkgicon</h3>\
<button id="trans" onclick="bjtv_action(\'trans\');" class="pretty_button spacer small"><span class="main">Enable Translucent Chat Column</span></buttion>\
<button id="darken" onclick="bjtv_action(\'dark\'); bjtv_action(\'notrans\');" class="pretty_button spacer small"><span class="main">Darken Background</span></button>\
<button onclick="bjtv_action(\'clear\');" class="pretty_button spacer small"><span class="main">Clear My Chat</span></button>\
<li class="radio_box" style="width: 200px;">\
<input checked="" type="checkbox" value="enable" class="left" id="imgoption" onchange="this.checked ? this.setAttribute(\'value\',\'enable\') : this.setAttribute(\'value\',\'disable\')" style="vertical-align: middle;">\
<label for="imgoption" style="vertical-align: middle;">[img][/img] Command</label>\
</li>\
</li>\
</ul>'
		}else{
		bjtvdiv.innerHTML = '<ul class="dropmenu_col inline_all">\
<li id="chat_section_chatroom" class="dropmenu_section">\
<h3 class="dropmenu_section_title">JTV hkgicon</h3>\
<button id="darken" onclick="bjtv_action(\'dark\'); bjtv_action(\'notrans\');" class="pretty_button spacer small"><span class="main">Darken Background</span></button>\
<button onclick="bjtv_action(\'clear\');" class="pretty_button spacer small"><span class="main">Clear My Chat</span></button>\
<li class="radio_box" style="width: 200px;">\
<input checked="" type="checkbox" value="enable" class="left" id="imgoption" onchange="this.checked ? this.setAttribute(\'value\',\'enable\') : this.setAttribute(\'value\',\'disable\')" style="vertical-align: middle;">\
<label for="imgoption" style="vertical-align: middle;">[img][/img] Command</label>\
</li>\
</li>\
</ul>';
		}
		settingsmenu.appendChild(bjtvdiv);		
}

function bttvbox()
{
	var dropmenu = document.getElementById("chat_settings_dropmenu");
	if(!dropmenu) return;
	var imgoption = document.createElement("form");
	imgoption.setAttribute("class", "dropmenu_action");
	imgoption.style.marginTop = "5px";
	imgoption.style.verticalAlign = "middle";
	imgoption.innerHTML = "<input checked type='checkbox' value='enable' class='left' id='imgoption' onchange='this.checked ? this.setAttribute(\"value\",\"enable\") : this.setAttribute(\"value\",\"disable\")' style='vertical-align: middle;'><span for='imgoption' style='vertical-align: middle;'> [img][/img] Command</span>"
	
	dropmenu.appendChild(imgoption);
}

function smilize(message)
{
    var imgoption = document.getElementById("imgoption");
	if (message.search("/img") != -1) {
		if (message.search("圖片網址") == -1) {
        	if(imgoption.value == "enable"){
            	for (j=0; j<=message.length; j++){
                	for (i=1; i<=message.length; i++){
                    	var text1 = message.split("[img]")[i];
                    	if (text1){
                        	var text1_2 = text1.split("[/img]")[0];
                        	if (text1_2){
                            	var img = text1_2.substring(text1_2.search('href')+6,text1_2.search('target')-2);
                        	}
                        	message=replaceAll(message,"[img]" + text1_2 + "[/img]","<a href='" + img + "' target='_blank'>" + "<img src='" + img + "' style='max-height:200px; max-width:200px; vertical-align:bottom;'>" + "</a>");
                    	}
                	}
            	}
        	}
		}
	}
message=replaceAll(message,":tf:", "<img src='http://jtvhkgicon.googlecode.com/svn/resources/trollface.png' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"D:", "<img src='http://s3.amazonaws.com/betterjtv/smileys/aww.png' style='vertical-align:bottom;'>");
message=replaceAll(message,";(", "<img src='http://s3.amazonaws.com/betterjtv/smileys/cry.png' style='vertical-align:bottom;'>");
message=replaceAll(message,":D", "<img src='http://dohirty.tv/i/e/m.jpg' style='vertical-align:bottom;'>");
message=replaceAll(message,"(puke)", "<img src='http://s3.amazonaws.com/betterjtv/smileys/puke.png' style='vertical-align:bottom;'>");
message=replaceAll(message,"(mooning)", "<img src='http://s3.amazonaws.com/betterjtv/smileys/mooning.png' style='vertical-align:bottom;'>");
message=replaceAll(message,"(poolparty)", "<img src='http://s3.amazonaws.com/betterjtv/smileys/poolparty.png' style='vertical-align:bottom;'>");
message=replaceAll(message,": )","<img src='http://images1.wikia.nocookie.net/__cb20080713124909/evchk/images/f/fb/Smile.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[angel]","<img src='http://images2.wikia.nocookie.net/__cb20080713124039/evchk/images/2/21/Angel.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"xx(","<img src='http://images4.wikia.nocookie.net/__cb20080713124334/evchk/images/8/80/Dead.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"o)","<img src='http://images2.wikia.nocookie.net/__cb20060324164344/evchk/images/0/0f/Clown.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,": (","<img src='http://images3.wikia.nocookie.net/__cb20080713124510/evchk/images/1/1c/Frown.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,":~(","<img src='http://images3.wikia.nocookie.net/__cb20080713124321/evchk/images/c/c6/Cry1.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"; )","<img src='http://images3.wikia.nocookie.net/__cb20080713124947/evchk/images/e/e0/Wink.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,":-[","<img src='http://images3.wikia.nocookie.net/__cb20080713124051/evchk/images/0/08/Angry.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,":-]","<img src='http://images.wikia.com/evchk/images/a/aa/Devil.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,": d","<img src='http://images4.wikia.nocookie.net/__cb20080713124132/evchk/images/8/8c/Biggrin.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,": D", "<img src='http://images4.wikia.nocookie.net/__cb20080713124132/evchk/images/8/8c/Biggrin.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,": o","<img src='http://images2.wikia.nocookie.net/__cb20080713124814/evchk/images/5/5c/Oh.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,": O","<img src='http://images2.wikia.nocookie.net/__cb20080713124814/evchk/images/5/5c/Oh.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,": p","<img src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,":p","<img src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,": P","<img src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"^3^","<img src='http://images1.wikia.nocookie.net/__cb20080713124726/evchk/images/1/18/Kiss.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"?_?","<img src='http://images3.wikia.nocookie.net/__cb20080713124956/evchk/images/7/7d/Wonder.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#yup#","<img src='http://images3.wikia.nocookie.net/__cb20080713124004/evchk/images/f/fa/Agree1.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#ng#","<img src='http://images1.wikia.nocookie.net/__cb20080713124411/evchk/images/c/cd/Donno.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#hehe#","<img src='http://images3.wikia.nocookie.net/__cb20080713124553/evchk/images/9/94/Hehe.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#love#","<img src='http://images4.wikia.nocookie.net/__cb20080713124740/evchk/images/5/51/Love.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#oh#","<img src='http://images2.wikia.nocookie.net/__cb20080713124919/evchk/images/7/7b/Surprise.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#cn#","<img src='http://images1.wikia.nocookie.net/__cb20080713131042/evchk/images/a/a0/Chicken.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#a ss#","<img src='http://images1.wikia.nocookie.net/__cb20080713124105/evchk/images/f/fd/Ass.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#fire#","<img src='http://images1.wikia.nocookie.net/__cb20080713124439/evchk/images/7/78/Fire1.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#good#","<img src='http://images3.wikia.nocookie.net/__cb20080713124537/evchk/images/5/5d/Good.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#good2#","<img src='http://m.hkgolden.com/faces/ThumbUp.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#bad#","<img src='http://m.hkgolden.com/faces/ThumbDown.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#hoho#","<img src='http://images1.wikia.nocookie.net/__cb20080713124605/evchk/images/c/c3/Hoho.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#kill#","<img src='http://images3.wikia.nocookie.net/__cb20080713124619/evchk/images/9/9f/Kill.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#kill2#","<img src='http://images2.wikia.nocookie.net/__cb20080713124648/evchk/images/a/ab/Kill2.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#bye#","<img src='http://images2.wikia.nocookie.net/__cb20080713124231/evchk/images/e/e2/Bye.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"z_z","<img src='http://images2.wikia.nocookie.net/__cb20080713125036/evchk/images/2/2c/Z.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"Z_Z","<img src='http://images2.wikia.nocookie.net/__cb20080713125036/evchk/images/2/2c/Z.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"@_@","<img src='http://images4.wikia.nocookie.net/__cb20080713123825/evchk/images/8/8c/%40.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"#adore#","<img src='http://images4.wikia.nocookie.net/__cb20080713123917/evchk/images/9/92/Adore.gif' style='vertical-align:bottom;'>");   
message=replaceAll(message,"#no#","<img src='http://images4.wikia.nocookie.net/__cb20080713124751/evchk/images/b/bd/No.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"???","<img src='http://images3.wikia.nocookie.net/__cb20080713125011/evchk/images/e/e3/Wonder2.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[fuc k]","<img src='http://images4.wikia.nocookie.net/__cb20080713124520/evchk/images/f/fb/Fuck.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[banghead]","<img src='http://images2.wikia.nocookie.net/__cb20060327092722/evchk/images/6/65/Banghead.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[bouncer]","<img src='http://images2.wikia.nocookie.net/__cb20080713124203/evchk/images/2/2e/Bouncer.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[bouncy]","<img src='http://images4.wikia.nocookie.net/__cb20080713124217/evchk/images/c/cf/Bouncy.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[censored]","<img src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"***","<img src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[flowerface]","<img src='http://images2.wikia.nocookie.net/__cb20080713124455/evchk/images/5/52/Flowerface.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[offtopic]","<img src='http://images1.wikia.nocookie.net/__cb20080713124802/evchk/images/4/47/Offtopic.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[shocking]","<img src='http://images3.wikia.nocookie.net/__cb20080713124841/evchk/images/3/38/Shocking.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[photo]","<img src='http://images1.wikia.nocookie.net/__cb20080713124827/evchk/images/8/8e/Photo.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[sosad]","<img src='http://images2.wikia.nocookie.net/__cb20060324170818/evchk/images/b/b2/Sosad.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[yipes]","<img src='http://images2.wikia.nocookie.net/__cb20080713125021/evchk/images/d/da/Yipes.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[369]","<img src='http://images2.wikia.nocookie.net/__cb20061215004441/evchk/images/e/ed/369.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[bomb]","<img src='http://images4.wikia.nocookie.net/__cb20080713124146/evchk/images/e/ed/Bomb.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[slick]","<img src='http://images2.wikia.nocookie.net/__cb20080713124855/evchk/images/c/c6/Slick.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[p1]", "<img src='http://i.imgur.com/ix1l0.gif' height=38 style='vertical-align:bottom;'>");
message=replaceAll(message,"[p2]", "<img src='http://i.imgur.com/3RkEx.gif' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[p3]", "<img src='http://i.imgur.com/SwZO4.gif' height=43 style='vertical-align:bottom;'>");
message=replaceAll(message,"[p4]", "<img src='http://i.imgur.com/pKkhC.gif' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[p5]", "<img src='http://wiki.pokemonpl.net/images/2/2d/025mini.gif' height=20 style='vertical-align:bottom;'>");
message=replaceAll(message,"[p6]", "<img src='http://i.imgur.com/CpP3A.gif' height=81 style='vertical-align:bottom;'>");
message=replaceAll(message,"[p7]", "<img src='http://i.imgur.com/3PqvE.gif' height=60 style='vertical-align:bottom;'>");
message=replaceAll(message,"[byecry]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/byecry.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[byesad]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/byesad.gif' style='vertical-align:bottom;'>");
message=replaceAll(message,"[small]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/small.gif' height=22 style='vertical-align:bottom;'>");
message=replaceAll(message,"[dogrun]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/dogrun.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,":trollface:", "<img src='http://jtvhkgicon.googlecode.com/svn/resources/trollface.png' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[bitchplease]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/bitchplease.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[foreveralone]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/foreveralone.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[yuno]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/yuno.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[megusta]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/megusta.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[fuc kyea]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/fuckyea.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[lol]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/lol.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[fap]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/fap.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[soon]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/soon.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[fullpanel]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/fullpanel.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[jackiechan]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/jackiechan.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[seriously?]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/seriously.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[truestory]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/truestory.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[youdontsay?]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/youdontsay.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[soclose]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/soclose.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[feellikeasir]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/feellikeasir.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[ymscare]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/ymscare.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[tryingtoscareme]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/tryingtoscareme.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[eats hit]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/eatshit.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[wadiu]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/wadiu.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[repeaterror]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/repeaterror.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[playlife]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/playlife.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[diuornodiu]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/diuornodiu.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[sofunny]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/sofunny.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[uwillneversucceed]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/uwillneversucceed.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[wantit?]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/wantit.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[pkambush]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/pkambush.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[grapebird]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/grapeb.gif' height=31 style='vertical-align:bottom;'>");
message=replaceAll(message,"[theseopportunites...]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/theseopportunities.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[ithinkiam0]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/ithinkiam0.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[seed?]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/seed.gif' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[icannotaccept]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/icannotaccept.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[stopsaying]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/stopsaying.gif' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[suchanuglygirl]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/suchanuglygirl.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[wholefamilydie]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/wholefamilydie.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[yesucan]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/yesucan.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[rufkingkiddingme?]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/rufkingkiddingme.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[deskflip]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/deskflip.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[ragepose]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/ragepose.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[morepics]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/morepics.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[gaaaaaayyy]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/gay.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[bye369]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/bye369.gif' height=15 style='vertical-align:bottom;'>");
message=replaceAll(message,"[peanuts369]","<img src='https://jtvhkgicon.googlecode.com/svn/resources/peanuts369.gif' height=28 style='vertical-align:bottom;'>");
message=replaceAll(message,"[okay]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/okay.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[killmeplease]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/killmeplease.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[ynotwtithink]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/mama.jpg' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[finalfantasy]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/finalfantasy.png' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[peanuts]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/peanuts.gif' height=35 style='vertical-align:bottom;'>");
message=replaceAll(message,"[no]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/no.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[fuuuu]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/fuuuu.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[ohgodwhy]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/ohgodwhy.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[:- [lm]","<img src='http://m.hkgolden.com/faces/lomore/angry.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[:dlm]","<img src='http://m.hkgolden.com/faces/lomore/biggrin.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[Olm]","<img src='http://m.hkgolden.com/faces/lomore/oh.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[Plm]","<img src='http://m.hkgolden.com/faces/lomore/tongue.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"#lovelm#","<img src='http://m.hkgolden.com/faces/lomore/love.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"#goodlm#","<img src='http://m.hkgolden.com/faces/lomore/good.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"#hoholm#","<img src='http://m.hkgolden.com/faces/lomore/hoho.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"#killlm#","<img src='http://m.hkgolden.com/faces/lomore/kill.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[?? ?lm]","<img src='http://m.hkgolden.com/faces/lomore/wonder2.gif' height=38 style='vertical-align:bottom;'>");
message=replaceAll(message,"[flowerfacelm]","<img src='http://m.hkgolden.com/faces/lomore/flowerface.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[shockinglm]","<img src='http://m.hkgolden.com/faces/lomore/shocking.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[yipeslm]","<img src='http://m.hkgolden.com/faces/lomore/yipes.gif' height=47 style='vertical-align:bottom;'>");
message=replaceAll(message,"[offtopiclm]","<img src='http://m.hkgolden.com/faces/lomore/offtopic.gif' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[369lm]","<img src='http://m.hkgolden.com/faces/lomore/369.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[@@lm]","<img src='http://m.hkgolden.com/faces/lomore/@.gif' height=35 style='vertical-align:bottom;'>");
message=replaceAll(message,"#hehelm#","<img src='http://m.hkgolden.com/faces/lomore/hehe.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[fuc klm]","<img src='http://m.hkgolden.com/faces/lomore/diu.gif' height=32 style='vertical-align:bottom;'>");
message=replaceAll(message,"[sosadlm]","<img src='http://m.hkgolden.com/faces/lomore/sosad.gif' height=37 style='vertical-align:bottom;'>");
message=replaceAll(message,"[bouncerlm]","<img src='http://m.hkgolden.com/faces/lomore/bouncer.gif' height=82 style='vertical-align:bottom;'>");
message=replaceAll(message,"[wfc]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/wfc.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[ifyouknowwhatimean]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/ifyouknowwhatimean.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[douknowtherules?]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/douknowtherules.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[illusiononly]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/illusiononly.gif' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[iknowthatfeelbro]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/iknowthatfeelbro.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[genius]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/genius.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[heiscrazy]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/heiscrazy.png' height=50 style='vertical-align:bottom;'>");
message=replaceAll(message,"[angelx]","<img src='http://m.hkgolden.com/faces/xmas/angel.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[xx (x]","<img src='http://m.hkgolden.com/faces/xmas/dead.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[)x]","<img src='http://m.hkgolden.com/faces/xmas/smile.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[o )x]","<img src='http://m.hkgolden.com/faces/xmas/clown.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[o )jx]","<img src='http://m.hkgolden.com/faces/xmas/clown_jesus.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[(x]","<img src='http://m.hkgolden.com/faces/xmas/frown.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[~(x]","<img src='http://m.hkgolden.com/faces/xmas/cry.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[;x]","<img src='http://m.hkgolden.com/faces/xmas/wink.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[:[x]","<img src='http://m.hkgolden.com/faces/xmas/angry.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[:]x]","<img src='http://m.hkgolden.com/faces/xmas/devil.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[:dx]","<img src='http://m.hkgolden.com/faces/xmas/biggrin.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[Ox]","<img src='http://m.hkgolden.com/faces/xmas/oh.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[Px]","<img src='http://m.hkgolden.com/faces/xmas/tongue.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[^x^]","<img src='http://m.hkgolden.com/faces/xmas/kiss.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[??x]","<img src='http://m.hkgolden.com/faces/xmas/wonder.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#yupx#","<img src='http://m.hkgolden.com/faces/xmas/agree.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#ngx#","<img src='http://m.hkgolden.com/faces/xmas/donno.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#hehex#","<img src='http://m.hkgolden.com/faces/xmas/hehe.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#lovex#","<img src='http://m.hkgolden.com/faces/xmas/love.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#ohx#","<img src='http://m.hkgolden.com/faces/xmas/surprise.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#a ssx#","<img src='http://m.hkgolden.com/faces/xmas/ass.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[sosadx]","<img src='http://m.hkgolden.com/faces/xmas/sosad.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#goodx#","<img src='http://m.hkgolden.com/faces/xmas/good.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#hohox#","<img src='http://m.hkgolden.com/faces/xmas/hoho.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#killx#","<img src='http://m.hkgolden.com/faces/xmas/kill.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#byex#","<img src='http://m.hkgolden.com/faces/xmas/bye.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[ZZx]","<img src='http://m.hkgolden.com/faces/xmas/z.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[@@x]","<img src='http://m.hkgolden.com/faces/xmas/@.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#adorex#","<img src='http://m.hkgolden.com/faces/xmas/adore.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#adore2x#","<img src='http://m.hkgolden.com/faces/xmas/adore2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[?x]","<img src='http://m.hkgolden.com/faces/xmas/wonder2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bangheadx]","<img src='http://m.hkgolden.com/faces/xmas/banghead.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bouncerx]","<img src='http://m.hkgolden.com/faces/xmas/bouncer.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[offtopicx]","<img src='http://m.hkgolden.com/faces/xmas/offtopic.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[censoredx]","<img src='http://m.hkgolden.com/faces/xmas/censored.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[flowerfacex]","<img src='http://m.hkgolden.com/faces/xmas/flowerface.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[shockingx]","<img src='http://m.hkgolden.com/faces/xmas/shocking.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[photox]","<img src='http://m.hkgolden.com/faces/xmas/photo.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[yipesx]","<img src='http://m.hkgolden.com/faces/xmas/yipes.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[yipes2x]","<img src='http://m.hkgolden.com/faces/xmas/yipes2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[yipes3x]","<img src='http://m.hkgolden.com/faces/xmas/yipes3.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[yipes4x]","<img src='http://m.hkgolden.com/faces/xmas/yipes4.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[369x]","<img src='http://m.hkgolden.com/faces/xmas/369.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bombx]","<img src='http://m.hkgolden.com/faces/xmas/bomb.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[slickx]","<img src='http://m.hkgolden.com/faces/xmas/slick.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[fuckx]","<img src='http://m.hkgolden.com/faces/xmas/diu.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#nox#","<img src='http://m.hkgolden.com/faces/xmas/no.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#kill2x#","<img src='http://m.hkgolden.com/faces/xmas/kill2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#kill3x#","<img src='http://m.hkgolden.com/faces/xmas/kill3.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#cnx#","<img src='http://m.hkgolden.com/faces/xmas/chicken.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#cn2x#","<img src='http://m.hkgolden.com/faces/xmas/chicken2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bouncyx]","<img src='http://m.hkgolden.com/faces/xmas/bouncy.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bouncy2x]","<img src='http://m.hkgolden.com/faces/xmas/bouncy2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#firex#","<img src='http://m.hkgolden.com/faces/xmas/fire.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[)gx]","<img src='http://m.hkgolden.com/faces/xmas/green/smile.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[o )gx]","<img src='http://m.hkgolden.com/faces/xmas/green/clown.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[(gx]","<img src='http://m.hkgolden.com/faces/xmas/green/frown.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[~(gx]","<img src='http://m.hkgolden.com/faces/xmas/green/cry.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#yupgx#","<img src='http://m.hkgolden.com/faces/xmas/green/agree.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[sosadgx]","<img src='http://m.hkgolden.com/faces/xmas/green/sosad.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#goodgx#","<img src='http://m.hkgolden.com/faces/xmas/green/good.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#byegx#","<img src='http://m.hkgolden.com/faces/xmas/green/bye.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[369gx]","<img src='http://m.hkgolden.com/faces/xmas/green/369.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[fuc kgx]","<img src='http://m.hkgolden.com/faces/xmas/green/diu.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[o )n]","<img src='http://m.hkgolden.com/faces/newyear/clown.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[o )2n]","<img src='http://m.hkgolden.com/faces/newyear/clown2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[o )3n]","<img src='http://m.hkgolden.com/faces/newyear/clown3.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#a ssn#","<img src='http://m.hkgolden.com/faces/newyear/ass.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[sosadn]","<img src='http://m.hkgolden.com/faces/newyear/sosad.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[sosad2n]","<img src='http://m.hkgolden.com/faces/newyear/sosad2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[sosad3n]","<img src='http://m.hkgolden.com/faces/newyear/sosad3.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bangheadn]","<img src='http://m.hkgolden.com/faces/newyear/banghead.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[banghead2n]","<img src='http://m.hkgolden.com/faces/newyear/banghead2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[yipesn]","<img src='http://m.hkgolden.com/faces/newyear/yipes.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[369n]","<img src='http://m.hkgolden.com/faces/newyear/369.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[3692n]","<img src='http://m.hkgolden.com/faces/newyear/3692.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[fuckn]","<img src='http://m.hkgolden.com/faces/newyear/diu.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bouncern]","<img src='http://m.hkgolden.com/faces/newyear/bouncer.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[offtopicn]","<img src='http://m.hkgolden.com/faces/newyear/offtopic.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[offtopic2n]","<img src='http://m.hkgolden.com/faces/newyear/offtopic2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[angelsk]","<img src='http://m.hkgolden.com/faces/sick/angel.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[o )sk]","<img src='http://m.hkgolden.com/faces/sick/clown.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[:[sk]","<img src='http://m.hkgolden.com/faces/sick/angry.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[:]sk]","<img src='http://m.hkgolden.com/faces/sick/devil.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#yupsk#","<img src='http://m.hkgolden.com/faces/sick/agree.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#ngsk#","<img src='http://m.hkgolden.com/faces/sick/donno.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#cnsk#","<img src='http://m.hkgolden.com/faces/sick/chicken.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#a sssk#","<img src='http://m.hkgolden.com/faces/sick/ass.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[sosadsk]","<img src='http://m.hkgolden.com/faces/sick/sosad.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#hohosk#","<img src='http://m.hkgolden.com/faces/sick/hoho.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#hoho2sk#","<img src='http://m.hkgolden.com/faces/sick/hoho2.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#killsk#","<img src='http://m.hkgolden.com/faces/sick/kill.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#byesk#","<img src='http://m.hkgolden.com/faces/sick/bye.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[@@sk]","<img src='http://m.hkgolden.com/faces/sick/@.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#adoresk# ","<img src='http://m.hkgolden.com/faces/sick/adore.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[bangheadsk]","<img src='http://m.hkgolden.com/faces/sick/banghead.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[flowersk]","<img src='http://m.hkgolden.com/faces/sick/flowerface.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[shockingsk]","<img src='http://m.hkgolden.com/faces/sick/shocking.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[photosk]","<img src='http://m.hkgolden.com/faces/sick/photo.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"#firesk#","<img src='http://m.hkgolden.com/faces/sick/fire.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[369sk]","<img src='http://m.hkgolden.com/faces/sick/369.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[fucksk]","<img src='http://m.hkgolden.com/faces/sick/diu.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[congrats]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/congrats.png' height=50 style='vertical-align:bottom'>");
message=replaceAll(message,":$","<img src='http://forum.mess.be/style_emoticons/mess.be/msn_embarrassed.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(awkward)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/8.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(drooling)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/17.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(hush)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/20.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(lusty)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/22.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(shy)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/33.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(brilliant)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/46.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"[nogirls]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/air_girl.gif' height=46 style='vertical-align:bottom'>");
message=replaceAll(message,"[notsad]","<img src='http://jtvhkgicon.googlecode.com/svn/resources/notsad.gif' height=17 style='vertical-align:bottom'>");
message=replaceAll(message,"(disregard)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/30.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(flighty)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/31.gif' style='vertical-align:bottom'>");
message=replaceAll(message,"(beat)","<img src='http://jtvhkgicon.googlecode.com/svn/resources/34.gif' style='vertical-align:bottom'>");
return message;
}

function fix190410()
{
        // fixes chat popups not working
        if(typeof console == "undefined" || typeof console.log == "undefined") window.console = { log: function() {} };
}

function trypro()
{
        if(typeof PP != "undefined") {
                PP['is_pro'] = true;
                PP.pro_account_activated = true;
        }
        if(typeof _gaq != "undefined") {
//              _gaq.push(['_setCustomVar', 2, "ProStatus", "pro", 1]);
        }
        if(typeof pro_hide_ads != "undefined") {
//              pro_hide_ads();
        }
}

function cstroke(color, size)
{
	return ''
		      +size+'px '+size+'px 0 '+color
		+', -'+size+'px  '+size+'px 0 '+color
		+',  '+size+'px -'+size+'px 0 '+color
		+', -'+size+'px -'+size+'px 0 '+color;
}

function brand()
{
	var logo;
	if(is_twitch) {
		logo = document.getElementById("header_logo");
	} else {
		logo = document.getElementById("jtv_frontpage_link");
	}
	if(!logo) return;

	logo.style.position = 'relative';

	var watermark = document.createElement("div");
	if(is_twitch) {
		watermark.style.top = "-11px";
		watermark.style.left = "-6px";
		watermark.style.textShadow = cstroke('purple', 1);
		watermark.style.color = "white";
	} else {
		watermark.style.top = "-2px";
		watermark.style.left = "-10px";
		watermark.style.color = "#FF0000";
	}
	watermark.innerHTML = "hkg";
	watermark.style.position = 'absolute';
	watermark.style.fontWeight = "bold";
	watermark.style.fontSize = "15px";
	watermark.style.fontFamily = "arial";
	watermark.style.textDecoration = "none !important";
	logo.appendChild(watermark);
}

function icon()
{
        bdebug.log("CALL icon");
        var chat_col;
        if(is_twitch) {
                chat_col = document.getElementById("twitch_chat");
        } else {
                chat_col = document.getElementById("speak");
        }

        if(!chat_col) return;
        bdebug.log("PROCESSING");

        var hkgicon = document.createElement("div");
        
        if(is_twitch) {
                hkgicon.style.marginLeft = "0px";
                hkgicon.style.marginTop = "10px";
                hkgicon.id = "iconset";
                //hkgicon.className = "right_col_rnd";
        } else {
                hkgicon.style.marginLeft = "-5px";
				hkgicon.style.marginBottom = "-210px";
				hkgicon.style.width="440px";
                hkgicon.style.height="200px";
                //hkgicon.style.marginTop = "-5px";
                hkgicon.id = "iconset";
                hkgicon.className = "right_col_rnd";
        }
        
        if(is_twitch) {
          hkgicon.innerHTML = "<table><tr>\
          <td id='myTab1' class='selected' onclick='changeTab(1);'><a class='button btn_empty round'>hkg</a></td>\
          <td id='myTab2' class='normal' onclick='changeTab(2);'><a class='button btn_empty round'>hkg2</a></td>\
		  <td><select id='hkg3' size='1' name='hkg3' class='hdr_soc_link' onchange='changeTab(this.value);' style='width:65px; height:20px; margin-top:0px; margin-right:0px;'>\
                      <option class='normal' value='' selected='selected'>hkg3</option>\
                      <option id='myTab6' class='normal' value='6' >聖誕</option>\
					  <option id='myTab7' class='normal' value='7' >綠帽</option>\
					  <option id='myTab8' class='normal' value='8' >新年</option>\
					  <option id='myTab9' class='normal' value='9' >SARS</option>\
          </select></td>\
		  <td id='myTab3' class='normal' onclick='changeTab(3);'><a class='button btn_empty round'>Lomore</a></td>\
          <td id='myTab4' class='normal' onclick='changeTab(4);'><a class='button btn_empty round'>meme</a></td>\
          <td id='myTab5' class='normal' onclick='changeTab(5);'><a class='button btn_empty round'>JTV</a></td>\
		  <td id='myTab10' class='normal' onclick='changeTab(10);'><a class='button btn_empty round'>Other</a></td>\
          </tr>\
          </table>\
          <div id='ac' style='margin-top: 5px; margin-left: 0px; height: 150px;'>\
          <div id='myTab_Content1'>\
          <table><tr><td colspan='2'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124039/evchk/images/2/21/Angel.gif' onclick='javascript:InsertText(\"[angel]\",false);' height='23'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124334/evchk/images/8/80/Dead.gif' onClick='javascript:InsertText(\"xx(\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124909/evchk/images/f/fb/Smile.gif' onClick='javascript:InsertText(\": )\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060324164344/evchk/images/0/0f/Clown.gif' onClick='javascript:InsertText(\"o)\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124510/evchk/images/1/1c/Frown.gif' onClick='javascript:InsertText(\": (\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124321/evchk/images/c/c6/Cry1.gif' onClick='javascript:InsertText(\":~(\",false);' height='18'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124947/evchk/images/e/e0/Wink.gif' onClick='javascript:InsertText(\"; )\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124051/evchk/images/0/08/Angry.gif' onClick='javascript:InsertText(\":-[\",false);' height='15'>\
          <img class='clickicon' src='http://images.wikia.com/evchk/images/a/aa/Devil.gif' onClick='javascript:InsertText(\":-]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124132/evchk/images/8/8c/Biggrin.gif' onClick='javascript:InsertText(\": d\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124814/evchk/images/5/5c/Oh.gif' onClick='javascript:InsertText(\": o\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' onClick='javascript:InsertText(\": p\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124726/evchk/images/1/18/Kiss.gif' onClick='javascript:InsertText(\"^3^\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124956/evchk/images/7/7d/Wonder.gif' onClick='javascript:InsertText(\"?_?\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124004/evchk/images/f/fa/Agree1.gif' onclick='javascript:InsertText(\"#yup#\",false);' height='28'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124411/evchk/images/c/cd/Donno.gif' onClick='javascript:InsertText(\"#ng#\",false);' height='16'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124553/evchk/images/9/94/Hehe.gif' onClick='javascript:InsertText(\"#hehe#\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124740/evchk/images/5/51/Love.gif' onClick='javascript:InsertText(\"#love#\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124919/evchk/images/7/7b/Surprise.gif' onClick='javascript:InsertText(\"#oh#\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713131042/evchk/images/a/a0/Chicken.gif' onClick='javascript:InsertText(\"#cn#\",false);' height='13'>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/notsad.gif' onClick='javascript:InsertText(\"[notsad]\",false);' height='17'>\
          </td></tr>\
          <tr> <td>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124105/evchk/images/f/fd/Ass.gif' onclick='javascript:InsertText(\"#a ss#\",false);' height='29'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060324170818/evchk/images/b/b2/Sosad.gif' onclick='javascript:InsertText(\"[sosad]\",false);' height='17'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124537/evchk/images/5/5d/Good.gif' onclick='javascript:InsertText(\"#good#\",false);' height='18'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/ThumbUp.gif' onclick='javascript:InsertText(\"#good2#\",false);' height='21'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/ThumbDown.gif' onClick='javascript:InsertText(\"#bad#\",false);' height='21'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124605/evchk/images/c/c3/Hoho.gif' onClick='javascript:InsertText(\"#hoho#\",false);' height='18'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124619/evchk/images/9/9f/Kill.gif' onClick='javascript:InsertText(\"#kill#\",false);' height='18'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124231/evchk/images/e/e2/Bye.gif' onClick='javascript:InsertText(\"#bye#\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713125036/evchk/images/2/2c/Z.gif' onClick='javascript:InsertText(\"z_z\",false);' height='25'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713123825/evchk/images/8/8c/@.gif' onClick='javascript:InsertText(\"@_@\",false);' height='17'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713123917/evchk/images/9/92/Adore.gif' onClick='javascript:InsertText(\"#adore#\",false);' height='22'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713125011/evchk/images/e/e3/Wonder2.gif' onClick='javascript:InsertText(\"???\",false);' height='22'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060327092722/evchk/images/6/65/Banghead.gif' onClick='javascript:InsertText(\"[banghead]\",false);' height='20'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124217/evchk/images/c/cf/Bouncy.gif' onclick='javascript:InsertText(\"[bouncy]\",false);' height='19'>\
          </td></tr>\
          <tr> <td>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif' onclick='javascript:InsertText(\"[censored]\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124455/evchk/images/5/52/Flowerface.gif' onclick='javascript:InsertText(\"[flowerface]\",false);' height='22'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124841/evchk/images/3/38/Shocking.gif' onclick='javascript:InsertText(\"[shocking]\",false);' height='25'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124827/evchk/images/8/8e/Photo.gif' onclick='javascript:InsertText(\"[photo]\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124439/evchk/images/7/78/Fire1.gif' onClick='javascript:InsertText(\"#fire#\",false);' height='16'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713125021/evchk/images/d/da/Yipes.gif' onclick='javascript:InsertText(\"[yipes]\",false);' height='30'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20061215004441/evchk/images/e/ed/369.gif' onClick='javascript:InsertText(\"[369]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124146/evchk/images/e/ed/Bomb.gif' onClick='javascript:InsertText(\"[bomb]\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124855/evchk/images/c/c6/Slick.gif' onClick='javascript:InsertText(\"[slick]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124520/evchk/images/f/fb/Fuck.gif' onClick='javascript:InsertText(\"[fuc k]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124751/evchk/images/b/bd/No.gif' onClick='javascript:InsertText(\"#no#\",false);' height='19'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124203/evchk/images/2/2e/Bouncer.gif' onclick='javascript:InsertText(\"[bouncer]\",false);' height='31'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124648/evchk/images/a/ab/Kill2.gif' onclick='javascript:InsertText(\"#kill2#\",false);' height='33'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124802/evchk/images/4/47/Offtopic.gif' onclick='javascript:InsertText(\"[offtopic]\",false);' height='46'>\
          </td></tr></table></div>\
          <div id='myTab_Content2' style='display:none;'>\
          <table><tr><td>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/img.gif' onClick='javascript:InsertText(\"[img],圖片網址,[/img]\",true);'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/byesad.gif' onClick='javascript:InsertText(\"[byesad]\",false);' height='15'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/byecry.gif' onClick='javascript:InsertText(\"[byecry]\",false);' height='18'>\
		  <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/bye369.gif' onClick='javascript:InsertText(\"[bye369]\",false);' height='15'>\
		  <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/peanuts369.gif' onClick='javascript:InsertText(\"[peanuts369]\",false);' height='28'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/peanuts.gif' onClick='javascript:InsertText(\"[peanuts]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/grapeb.gif' onClick='javascript:InsertText(\"[grapebird]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/air_girl.gif' onClick='javascript:InsertText(\"[nogirls]\",false);' height='32'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/dogrun.gif' onClick='javascript:InsertText(\"[dogrun]\",false);' width='150'>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/small.gif' onClick='javascript:InsertText(\"[small]\",false);' height='22'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/tryingtoscareme.png' onClick='javascript:InsertText(\"[tryingtoscareme]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/eatshit.png' onClick='javascript:InsertText(\"[eats hit]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wadiu.png' onClick='javascript:InsertText(\"[wadiu]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/repeaterror.png' onclick='javascript:InsertText(\"[repeaterror]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/playlife.png' height=32 onClick='javascript:InsertText(\"[playlife]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/diuornodiu.png' height=32 onClick='javascript:InsertText(\"[diuornodiu]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/sofunny.png' height=32 onClick='javascript:InsertText(\"[sofunny]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/uwillneversucceed.png' height=32 onClick='javascript:InsertText(\"[uwillneversucceed]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wantit.png' height=32 onClick='javascript:InsertText(\"[wantit?]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/pkambush.png' height=32 onClick='javascript:InsertText(\"[pkambush]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/theseopportunities.png' height=32 onClick='javascript:InsertText(\"[theseopportunites...]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ithinkiam0.png' height=32 onClick='javascript:InsertText(\"[ithinkiam0]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/seed.gif' onclick='javascript:InsertText(\"[seed?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/icannotaccept.png' onclick='javascript:InsertText(\"[icannotaccept]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/stopsaying.gif' onClick='javascript:InsertText(\"[stopsaying]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/suchanuglygirl.png' onclick='javascript:InsertText(\"[suchanuglygirl]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wholefamilydie.png' onclick='javascript:InsertText(\"[wholefamilydie]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/morepics.png' onclick='javascript:InsertText(\"[morepics]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/killmeplease.png' onclick='javascript:InsertText(\"[killmeplease]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/mama.jpg' onclick='javascript:InsertText(\"[ynotwtithink]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wfc.png' onclick='javascript:InsertText(\"[wfc]\",false);' height=32>\
		  <img class='clickicon' src='https://jtvhkgicon.googlecode.com/svn/resources/douknowtherules.png' onclick='javascript:InsertText(\"[douknowtherules?]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/illusiononly.gif' onclick='javascript:InsertText(\"[illusiononly]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/heiscrazy.png' onclick='javascript:InsertText(\"[heiscrazy]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/congrats.png'  onclick='javascript:InsertText(\"[congrats]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/finalfantasy.png' onclick='javascript:InsertText(\"[finalfantasy]\",false);' height=32>\
          </td></tr></table></div>\
		  <div id='myTab_Content3' style='display:none;'>\
          <table><tr><td>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://m.hkgolden.com/faces/lomore/angry.gif' onClick='javascript:InsertText(\"[:- [lm]\",false);'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://m.hkgolden.com/faces/lomore/biggrin.gif' onClick='javascript:InsertText(\"[:dlm]\",false);'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://m.hkgolden.com/faces/lomore/oh.gif' onClick='javascript:InsertText(\"[Olm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/tongue.gif' onClick='javascript:InsertText(\"[Plm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/love.gif' onClick='javascript:InsertText(\"#lovelm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/good.gif' onClick='javascript:InsertText(\"#goodlm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/hoho.gif' onClick='javascript:InsertText(\"#hoholm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/kill.gif' onclick='javascript:InsertText(\"#killlm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/wonder2.gif' onclick='javascript:InsertText(\"[?? ?lm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/flowerface.gif' onclick='javascript:InsertText(\"[flowerfacelm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/shocking.gif' onclick='javascript:InsertText(\"[shockinglm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/yipes.gif' onClick='javascript:InsertText(\"[yipeslm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/offtopic.gif' onClick='javascript:InsertText(\"[offtopiclm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/369.gif' onClick='javascript:InsertText(\"[369lm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/@.gif' onClick='javascript:InsertText(\"[@@lm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/hehe.gif' onClick='javascript:InsertText(\"#hehelm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/diu.gif' onClick='javascript:InsertText(\"[fuc klm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/sosad.gif' onClick='javascript:InsertText(\"[sosadlm]\",false);'>\
          </td>\
		  <td><img style='cursor:pointer; margin-top:-8px;' src='http://m.hkgolden.com/faces/lomore/bouncer.gif' onClick='javascript:InsertText(\"[bouncerlm]\",false);'></td>\
		  </tr></table></div>\
          <div id='myTab_Content4' style='display:none;'>\
          <table><tr><td>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/foreveralone.png' onclick='javascript:InsertText(\"[foreveralone]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/trollface.png' onclick='javascript:InsertText(\":trollface:\",false);' height='32'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/bitchplease.png' height='32' onclick='javascript:InsertText(\"[bitchplease]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/yuno.png' onclick='javascript:InsertText(\"[yuno]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/megusta.png' onclick='javascript:InsertText(\"[megusta]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fuckyea.png' onclick='javascript:InsertText(\"[fuc kyea]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/lol.png' onclick='javascript:InsertText(\"[lol]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fap.png' onclick='javascript:InsertText(\"[fap]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/soon.png' onclick='javascript:InsertText(\"[soon]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/seriously.png' onclick='javascript:InsertText(\"[seriously?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/truestory.png' onclick='javascript:InsertText(\"[truestory]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/jackiechan.png' onclick='javascript:InsertText(\"[jackiechan]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fullpanel.png' onclick='javascript:InsertText(\"[fullpanel]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/youdontsay.png' onclick='javascript:InsertText(\"[youdontsay?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ragepose.png' onclick='javascript:InsertText(\"[ragepose]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/soclose.png' onclick='javascript:InsertText(\"[soclose]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/feellikeasir.png' onclick='javascript:InsertText(\"[feellikeasir]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ymscare.png' onclick='javascript:InsertText(\"[ymscare]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/yesucan.png' onclick='javascript:InsertText(\"[yesucan]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/rufkingkiddingme.png' onclick='javascript:InsertText(\"[rufkingkiddingme?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/deskflip.png' onclick='javascript:InsertText(\"[deskflip]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/okay.png' onclick='javascript:InsertText(\"[okay]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/no.png' onclick='javascript:InsertText(\"[no]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fuuuu.png' onclick='javascript:InsertText(\"[fuuuu]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ohgodwhy.png' onclick='javascript:InsertText(\"[ohgodwhy]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ifyouknowwhatimean.png' onclick='javascript:InsertText(\"[ifyouknowwhatimean]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/iknowthatfeelbro.png' onclick='javascript:InsertText(\"[iknowthatfeelbro]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/genius.png' onclick='javascript:InsertText(\"[genius]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/gay.png' onclick='javascript:InsertText(\"[gaaaaaayyy]\",false);' height=32>\
          </td></tr></table></div>\
          <div id='myTab_Content5' style='display:none;'>\
          <table><tr><td>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c2b7132654a19e02-24x18.png' onclick='javascript:InsertText(\"R)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-13d54d9e49b593b3-24x18.png' onclick='javascript:InsertText(\":)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a3f5d14a3190ef1-24x18.png' onclick='javascript:InsertText(\":p\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-912125d7459226cc-24x18.png' onclick='javascript:InsertText(\";P\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e073a3348e028b40-24x18.png' onclick='javascript:InsertText(\"B)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-aa3dd5587f06bb7b-24x18.png' onclick='javascript:InsertText(\";)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e9218a512e65b0de-24x18.png' onclick='javascript:InsertText(\"O_o\",false);'>\
		  <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-939757d7759f071f-24x18.png' onclick='javascript:InsertText(\":z\",false);'>\
		  <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2d2d0e6fdbc0b733-24x18.png' onclick='javascript:InsertText(\":(\",false);'>\
		  <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-67cde8d0b7916e57-24x18.png' onclick='javascript:InsertText(\"<3\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png' onclick='javascript:InsertText(\"Kreygasm\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png' onclick='javascript:InsertText(\"Kappa\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6b8d1be08f244e92-19x27.png' onclick='javascript:InsertText(\"RedCoat\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8b5aaae6e2409deb-20x27.png' onclick='javascript:InsertText(\"StoneLightning\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1903cc415afc404c-20x27.png' onclick='javascript:InsertText(\"TheRinger\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a7ee1bc0e5c9af0-21x27.png' onclick='javascript:InsertText(\"JKanStyle\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-41f8a86c4b15b5d8-22x27.png' onclick='javascript:InsertText(\"OptimizePrime\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-551cd64fc3d4590a-21x27.png' onclick='javascript:InsertText(\"CougarHunt\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-95eb8045e7ae63b8-18x27.png' onclick='javascript:InsertText(\"EagleEye\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-35ae4e0e8dd045e1-22x27.png' onclick='javascript:InsertText(\"BrokeBack\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-740242272832a108-30x30.png' onclick='javascript:InsertText(\"BionicBunion\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-521420789e1e93ef-18x27.png' onclick='javascript:InsertText(\"PazPazowitz\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png' onclick='javascript:InsertText(\"SwiftRage\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-39f055e707725b5d-18x27.png' onclick='javascript:InsertText(\"BrainSlug\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png' onclick='javascript:InsertText(\"DansGame\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png' onclick='javascript:InsertText(\"PJSalt\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a1a8bb5cdf6efb9-24x32.png' onclick='javascript:InsertText(\"MVGame\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1e3ccd969459f889-29x27.png' onclick='javascript:InsertText(\"BCWarrior\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ac61a7aeb52a49d3-39x27.png' onclick='javascript:InsertText(\"MrDestructoid\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce027387c35fb601-22x27.png' onclick='javascript:InsertText(\"PicoMause\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6aaca644ea5374c6-20x27.png' onclick='javascript:InsertText(\"JonCarnage\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3dac9659e838fab2-20x27.png' onclick='javascript:InsertText(\"StrawBeary\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2febb829eae08b0a-21x27.png' onclick='javascript:InsertText(\"GingerPower\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-92a1b848540e9347-23x27.png' onclick='javascript:InsertText(\"SuperVinlin\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f276ed33053ec70-32x32.png' onclick='javascript:InsertText(\"SMOrc\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d14278fea8fad146-19x27.png' onclick='javascript:InsertText(\"FreakinStinkin\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a5293e92212cadd9-21x27.png' onclick='javascript:InsertText(\"BlargNaut\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d530ef454aa17093-21x27.png' onclick='javascript:InsertText(\"KevinTurtle\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-179f310b0746584d-23x27.png' onclick='javascript:InsertText(\"NoNoSpot\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-58f4782b85d0069f-17x27.png' onclick='javascript:InsertText(\"SoBayed\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png' onclick='javascript:InsertText(\"SSSsss\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b85003ffba04e03e-24x24.png' onclick='javascript:InsertText(\"PunchTrees\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5342e829290d1af0-17x27.png' onclick='javascript:InsertText(\"UleetBackup\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e13a8382e40b19c7-18x27.png' onclick='javascript:InsertText(\"ArsonNoSexy\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a204e65775b969c5-27x27.png' onclick='javascript:InsertText(\"TehFunrun\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-89e474822a976928-19x27.png' onclick='javascript:InsertText(\"NinjaTroll\",false);'>\
          </td></tr></table></div>\
		  <div id='myTab_Content6' style='display:none; width:440px; height:150px; overflow-y:scroll;'><table><tbody><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[angelx]\",false)' src='http://m.hkgolden.com/faces/xmas/angel.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[xx (x]\",false)' src='http://m.hkgolden.com/faces/xmas/dead.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[)x]\",false)' src='http://m.hkgolden.com/faces/xmas/smile.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )x]\",false)' src='http://m.hkgolden.com/faces/xmas/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )jx]\",false)' src='http://m.hkgolden.com/faces/xmas/clown_jesus.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[(x]\",false)' src='http://m.hkgolden.com/faces/xmas/frown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[~(x]\",false)' src='http://m.hkgolden.com/faces/xmas/cry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[;x]\",false)' src='http://m.hkgolden.com/faces/xmas/wink.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:[x]\",false)' src='http://m.hkgolden.com/faces/xmas/angry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:]x]\",false)' src='http://m.hkgolden.com/faces/xmas/devil.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:dx]\",false)' src='http://m.hkgolden.com/faces/xmas/biggrin.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[Ox]\",false)' src='http://m.hkgolden.com/faces/xmas/oh.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[Px]\",false)' src='http://m.hkgolden.com/faces/xmas/tongue.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[^x^]\",false)' src='http://m.hkgolden.com/faces/xmas/kiss.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[??x]\",false)' src='http://m.hkgolden.com/faces/xmas/wonder.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#yupx#\",false)' src='http://m.hkgolden.com/faces/xmas/agree.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#ngx#\",false)' src='http://m.hkgolden.com/faces/xmas/donno.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hehex#\",false)' src='http://m.hkgolden.com/faces/xmas/hehe.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#lovex#\",false)' src='http://m.hkgolden.com/faces/xmas/love.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#ohx#\",false)' src='http://m.hkgolden.com/faces/xmas/surprise.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#a ssx#\",false)' src='http://m.hkgolden.com/faces/xmas/ass.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadx]\",false)' src='http://m.hkgolden.com/faces/xmas/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#goodx#\",false)' src='http://m.hkgolden.com/faces/xmas/good.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hohox#\",false)' src='http://m.hkgolden.com/faces/xmas/hoho.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#killx#\",false)' src='http://m.hkgolden.com/faces/xmas/kill.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#byex#\",false)' src='http://m.hkgolden.com/faces/xmas/bye.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[ZZx]\",false)' src='http://m.hkgolden.com/faces/xmas/z.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[@@x]\",false)' src='http://m.hkgolden.com/faces/xmas/@.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#adorex#\",false)' src='http://m.hkgolden.com/faces/xmas/adore.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#adore2x#\",false)' src='http://m.hkgolden.com/faces/xmas/adore2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[?x]\",false)' src='http://m.hkgolden.com/faces/xmas/wonder2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadx]\",false)' src='http://m.hkgolden.com/faces/xmas/banghead.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncerx]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncer.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[offtopicx]\",false)' src='http://m.hkgolden.com/faces/xmas/offtopic.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[censoredx]\",false)' src='http://m.hkgolden.com/faces/xmas/censored.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[flowerfacex]\",false)' src='http://m.hkgolden.com/faces/xmas/flowerface.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[shockingx]\",false)' src='http://m.hkgolden.com/faces/xmas/shocking.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[photox]\",false)' src='http://m.hkgolden.com/faces/xmas/photo.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipesx]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipes2x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipes3x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipes4x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes4.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369x]\",false)' src='http://m.hkgolden.com/faces/xmas/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bombx]\",false)' src='http://m.hkgolden.com/faces/xmas/bomb.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[slickx]\",false)' src='http://m.hkgolden.com/faces/xmas/slick.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fuckx]\",false)' src='http://m.hkgolden.com/faces/xmas/diu.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#nox#\",false)' src='http://m.hkgolden.com/faces/xmas/no.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#kill2x#\",false)' src='http://m.hkgolden.com/faces/xmas/kill2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#kill3x#\",false)' src='http://m.hkgolden.com/faces/xmas/kill3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#cnx#\",false)' src='http://m.hkgolden.com/faces/xmas/chicken.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#cn2x#\",false)' src='http://m.hkgolden.com/faces/xmas/chicken2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncyx]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncy.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncy2x]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncy2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#firex#\",false)' src='http://m.hkgolden.com/faces/xmas/fire.gif'>\
		  </td></tbody></table></div>\
		  <div id='myTab_Content7' style='display:none;'>\
		  <table><tbody>\
		  <tr><td colspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[)gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/smile.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[(gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/frown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[~(gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/cry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#yupgx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/agree.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadgx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#goodgx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/good.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#byegx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/bye.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fuc kgx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/diu.gif'>\
		  </td></tr>\
		  </tbody></table></div>\
		  <div id='myTab_Content8' style='display:none;'>\
		  <table><tbody><tr><td colspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )2n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )3n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#a ssn#\",false)' src='http://m.hkgolden.com/faces/newyear/ass.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadn]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosad2n]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosad3n]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadn]\",false)' src='http://m.hkgolden.com/faces/newyear/banghead.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[banghead2n]\",false)' src='http://m.hkgolden.com/faces/newyear/banghead2.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipesn]\",false)' src='http://m.hkgolden.com/faces/newyear/yipes.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369n]\",false)' src='http://m.hkgolden.com/faces/newyear/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[3692n]\",false)' src='http://m.hkgolden.com/faces/newyear/3692.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fuckn]\",false)' src='http://m.hkgolden.com/faces/newyear/diu.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncern]\",false)' src='http://m.hkgolden.com/faces/newyear/bouncer.gif'>\
		  </td>\
		  <td valign='bottom' rowspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[offtopicn]\",false)' src='http://m.hkgolden.com/faces/newyear/offtopic.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[offtopic2n]\",false)' src='http://m.hkgolden.com/faces/newyear/offtopic2.gif'>\
		  </td></tr></tbody></table>\
		  </div>\
		  <div id='myTab_Content9' style='display:none;'>\
		  <table><tbody>\
		  <tr><td colspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[angelsk]\",false)' src='http://m.hkgolden.com/faces/sick/angel.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )sk]\",false)' src='http://m.hkgolden.com/faces/sick/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:[sk]\",false)' src='http://m.hkgolden.com/faces/sick/angry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:]sk]\",false)' src='http://m.hkgolden.com/faces/sick/devil.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#yupsk#\",false)' src='http://m.hkgolden.com/faces/sick/agree.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#ngsk#\",false)' src='http://m.hkgolden.com/faces/sick/donno.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#cnsk#\",false)' src='http://m.hkgolden.com/faces/sick/chicken.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#a sssk#\",false)' src='http://m.hkgolden.com/faces/sick/ass.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadsk]\",false)' src='http://m.hkgolden.com/faces/sick/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hohosk#\",false)' src='http://m.hkgolden.com/faces/sick/hoho.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hoho2sk#\",false)' src='http://m.hkgolden.com/faces/sick/hoho2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#killsk#\",false)' src='http://m.hkgolden.com/faces/sick/kill.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#byesk#\",false)' src='http://m.hkgolden.com/faces/sick/bye.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[@@sk]\",false)' src='http://m.hkgolden.com/faces/sick/@.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#adoresk# \",false)' src='http://m.hkgolden.com/faces/sick/adore.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadsk]\",false)' src='http://m.hkgolden.com/faces/sick/banghead.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[flowersk]\",false)' src='http://m.hkgolden.com/faces/sick/flowerface.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[shockingsk]\",false)' src='http://m.hkgolden.com/faces/sick/shocking.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[photosk]\",false)' src='http://m.hkgolden.com/faces/sick/photo.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#firesk#\",false)' src='http://m.hkgolden.com/faces/sick/fire.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369sk]\",false)' src='http://m.hkgolden.com/faces/sick/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fucksk]\",false)' src='http://m.hkgolden.com/faces/sick/diu.gif'>\
		  </td></tr>\
		  </tbody></table>\
		  </div>\
		  <div id='myTab_Content10' style='display:none;'>\
		  <table><tbody>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\":$\",false)' src='http://forum.mess.be/style_emoticons/mess.be/msn_embarrassed.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(awkward)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/8.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(drooling)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/17.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(hush)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/20.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(lusty)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/22.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(disregard)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/30.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(flighty)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/31.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(shy)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/33.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(beat)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/34.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(brilliant)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/46.gif'>\
		  </td></tr>\
		  </tbody></table>\
		  </div>";
        chat_col.appendChild(hkgicon);
        }else{
        hkgicon.innerHTML = "<table><tr>\
          <td id='myTab1' class='selected' onclick='changeTab(1);'><a class='pretty_button'>hkg</a></td>\
          <td id='myTab2' class='normal' onclick='changeTab(2);'><a class='pretty_button'>hkg2</a></td>\
		  <td><select id='hkg3' size='1' name='hkg3' class='pretty_button' onchange='changeTab(this.value);' style='width:80px'>\
                      <option class='normal' value='' selected='selected'>hkg3</option>\
                      <option id='myTab6' class='normal' value='6' >聖誕</option>\
					  <option id='myTab7' class='normal' value='7' >綠帽</option>\
					  <option id='myTab8' class='normal' value='8' >新年</option>\
					  <option id='myTab9' class='normal' value='9' >SARS</option>\
          </select></td>\
		  <td id='myTab3' class='normal' onclick='changeTab(3);'><a class='pretty_button'>Lomore</a></td>\
          <td id='myTab4' class='normal' onclick='changeTab(4);'><a class='pretty_button'>meme</a></td>\
          <td id='myTab5' class='normal' onclick='changeTab(5);'><a class='pretty_button'>JTV</a></td>\
		  <td id='myTab10' class='normal' onclick='changeTab(10);'><a class='pretty_button'>Other</a></td>\
          </tr>\
          </table>\
          <div id='ac' style='margin-top:5px; margin-left: 0px;'>\
		  <div id='myTab_Content1'>\
          <table><tr><td colspan='2'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124039/evchk/images/2/21/Angel.gif' onclick='javascript:InsertText(\"[angel]\",false);' height='23'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124334/evchk/images/8/80/Dead.gif' onClick='javascript:InsertText(\"xx(\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124909/evchk/images/f/fb/Smile.gif' onClick='javascript:InsertText(\": )\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060324164344/evchk/images/0/0f/Clown.gif' onClick='javascript:InsertText(\"o)\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124510/evchk/images/1/1c/Frown.gif' onClick='javascript:InsertText(\": (\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124321/evchk/images/c/c6/Cry1.gif' onClick='javascript:InsertText(\":~(\",false);' height='18'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124947/evchk/images/e/e0/Wink.gif' onClick='javascript:InsertText(\"; )\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124051/evchk/images/0/08/Angry.gif' onClick='javascript:InsertText(\":-[\",false);' height='15'>\
          <img class='clickicon' src='http://images.wikia.com/evchk/images/a/aa/Devil.gif' onClick='javascript:InsertText(\":-]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124132/evchk/images/8/8c/Biggrin.gif' onClick='javascript:InsertText(\": d\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124814/evchk/images/5/5c/Oh.gif' onClick='javascript:InsertText(\": o\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' onClick='javascript:InsertText(\": p\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124726/evchk/images/1/18/Kiss.gif' onClick='javascript:InsertText(\"^3^\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124956/evchk/images/7/7d/Wonder.gif' onClick='javascript:InsertText(\"?_?\",false);' height='15'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124004/evchk/images/f/fa/Agree1.gif' onclick='javascript:InsertText(\"#yup#\",false);' height='28'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124411/evchk/images/c/cd/Donno.gif' onClick='javascript:InsertText(\"#ng#\",false);' height='16'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124553/evchk/images/9/94/Hehe.gif' onClick='javascript:InsertText(\"#hehe#\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124740/evchk/images/5/51/Love.gif' onClick='javascript:InsertText(\"#love#\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124919/evchk/images/7/7b/Surprise.gif' onClick='javascript:InsertText(\"#oh#\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713131042/evchk/images/a/a0/Chicken.gif' onClick='javascript:InsertText(\"#cn#\",false);' height='13'>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/notsad.gif' onClick='javascript:InsertText(\"[notsad]\",false);' height='17'>\
          </td></tr>\
          <tr> <td>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124105/evchk/images/f/fd/Ass.gif' onclick='javascript:InsertText(\"#a ss#\",false);' height='29'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060324170818/evchk/images/b/b2/Sosad.gif' onclick='javascript:InsertText(\"[sosad]\",false);' height='17'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124537/evchk/images/5/5d/Good.gif' onclick='javascript:InsertText(\"#good#\",false);' height='18'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/ThumbUp.gif' onclick='javascript:InsertText(\"#good2#\",false);' height='21'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/ThumbDown.gif' onClick='javascript:InsertText(\"#bad#\",false);' height='21'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124605/evchk/images/c/c3/Hoho.gif' onClick='javascript:InsertText(\"#hoho#\",false);' height='18'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124619/evchk/images/9/9f/Kill.gif' onClick='javascript:InsertText(\"#kill#\",false);' height='18'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124231/evchk/images/e/e2/Bye.gif' onClick='javascript:InsertText(\"#bye#\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713125036/evchk/images/2/2c/Z.gif' onClick='javascript:InsertText(\"z_z\",false);' height='25'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713123825/evchk/images/8/8c/@.gif' onClick='javascript:InsertText(\"@_@\",false);' height='17'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713123917/evchk/images/9/92/Adore.gif' onClick='javascript:InsertText(\"#adore#\",false);' height='22'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713125011/evchk/images/e/e3/Wonder2.gif' onClick='javascript:InsertText(\"???\",false);' height='22'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060327092722/evchk/images/6/65/Banghead.gif' onClick='javascript:InsertText(\"[banghead]\",false);' height='20'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124217/evchk/images/c/cf/Bouncy.gif' onclick='javascript:InsertText(\"[bouncy]\",false);' height='19'>\
          </td></tr>\
          <tr> <td>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif' onclick='javascript:InsertText(\"[censored]\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124455/evchk/images/5/52/Flowerface.gif' onclick='javascript:InsertText(\"[flowerface]\",false);' height='22'>\
          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124841/evchk/images/3/38/Shocking.gif' onclick='javascript:InsertText(\"[shocking]\",false);' height='25'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124827/evchk/images/8/8e/Photo.gif' onclick='javascript:InsertText(\"[photo]\",false);' height='15'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124439/evchk/images/7/78/Fire1.gif' onClick='javascript:InsertText(\"#fire#\",false);' height='16'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713125021/evchk/images/d/da/Yipes.gif' onclick='javascript:InsertText(\"[yipes]\",false);' height='30'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20061215004441/evchk/images/e/ed/369.gif' onClick='javascript:InsertText(\"[369]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124146/evchk/images/e/ed/Bomb.gif' onClick='javascript:InsertText(\"[bomb]\",false);' height='15'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124855/evchk/images/c/c6/Slick.gif' onClick='javascript:InsertText(\"[slick]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124520/evchk/images/f/fb/Fuck.gif' onClick='javascript:InsertText(\"[fuc k]\",false);' height='15'>\
          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124751/evchk/images/b/bd/No.gif' onClick='javascript:InsertText(\"#no#\",false);' height='19'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124203/evchk/images/2/2e/Bouncer.gif' onclick='javascript:InsertText(\"[bouncer]\",false);' height='31'>\
          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124648/evchk/images/a/ab/Kill2.gif' onclick='javascript:InsertText(\"#kill2#\",false);' height='33'>\
          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124802/evchk/images/4/47/Offtopic.gif' onclick='javascript:InsertText(\"[offtopic]\",false);' height='46'>\
          </td></tr></table></div>\
          <div id='myTab_Content2' style='display:none;'>\
          <table><tr><td>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/img.gif' onClick='javascript:InsertText(\"[img],圖片網址,[/img]\",true);'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/byesad.gif' onClick='javascript:InsertText(\"[byesad]\",false);' height='15'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/byecry.gif' onClick='javascript:InsertText(\"[byecry]\",false);' height='18'>\
		  <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/bye369.gif' onClick='javascript:InsertText(\"[bye369]\",false);' height='15'>\
		  <img style='cursor:pointer; vertical-align:middle;' src='http://jtvhkgicon.googlecode.com/svn/resources/peanuts369.gif' onClick='javascript:InsertText(\"[peanuts369]\",false);' height='28'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/peanuts.gif' onClick='javascript:InsertText(\"[peanuts]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/grapeb.gif' onClick='javascript:InsertText(\"[grapebird]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/air_girl.gif' onClick='javascript:InsertText(\"[nogirls]\",false);' height='32'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/dogrun.gif' onClick='javascript:InsertText(\"[dogrun]\",false);' width='150'>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/small.gif' onClick='javascript:InsertText(\"[small]\",false);' height='22'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/tryingtoscareme.png' onClick='javascript:InsertText(\"[tryingtoscareme]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/eatshit.png' onClick='javascript:InsertText(\"[eats hit]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wadiu.png' onClick='javascript:InsertText(\"[wadiu]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/repeaterror.png' onclick='javascript:InsertText(\"[repeaterror]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/playlife.png' height=32 onClick='javascript:InsertText(\"[playlife]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/diuornodiu.png' height=32 onClick='javascript:InsertText(\"[diuornodiu]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/sofunny.png' height=32 onClick='javascript:InsertText(\"[sofunny]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/uwillneversucceed.png' height=32 onClick='javascript:InsertText(\"[uwillneversucceed]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wantit.png' height=32 onClick='javascript:InsertText(\"[wantit?]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/pkambush.png' height=32 onClick='javascript:InsertText(\"[pkambush]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/theseopportunities.png' height=32 onClick='javascript:InsertText(\"[theseopportunites...]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ithinkiam0.png' height=32 onClick='javascript:InsertText(\"[ithinkiam0]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/seed.gif' onclick='javascript:InsertText(\"[seed?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/icannotaccept.png' onclick='javascript:InsertText(\"[icannotaccept]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/stopsaying.gif' onClick='javascript:InsertText(\"[stopsaying]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/suchanuglygirl.png' onclick='javascript:InsertText(\"[suchanuglygirl]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wholefamilydie.png' onclick='javascript:InsertText(\"[wholefamilydie]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/morepics.png' onclick='javascript:InsertText(\"[morepics]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/killmeplease.png' onclick='javascript:InsertText(\"[killmeplease]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/mama.jpg' onclick='javascript:InsertText(\"[ynotwtithink]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/wfc.png' onclick='javascript:InsertText(\"[wfc]\",false);' height=32>\
		  <img class='clickicon' src='https://jtvhkgicon.googlecode.com/svn/resources/douknowtherules.png' onclick='javascript:InsertText(\"[douknowtherules?]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/illusiononly.gif' onclick='javascript:InsertText(\"[illusiononly]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/heiscrazy.png' onclick='javascript:InsertText(\"[heiscrazy]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/congrats.png'  onclick='javascript:InsertText(\"[congrats]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/finalfantasy.png' onclick='javascript:InsertText(\"[finalfantasy]\",false);' height=32>\
          </td></tr></table></div>\
		  <div id='myTab_Content3' style='display:none;'>\
          <table><tr><td>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://m.hkgolden.com/faces/lomore/angry.gif' onClick='javascript:InsertText(\"[:- [lm]\",false);'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://m.hkgolden.com/faces/lomore/biggrin.gif' onClick='javascript:InsertText(\"[:dlm]\",false);'>\
          <img style='cursor:pointer; vertical-align:middle;' src='http://m.hkgolden.com/faces/lomore/oh.gif' onClick='javascript:InsertText(\"[Olm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/tongue.gif' onClick='javascript:InsertText(\"[Plm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/love.gif' onClick='javascript:InsertText(\"#lovelm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/good.gif' onClick='javascript:InsertText(\"#goodlm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/hoho.gif' onClick='javascript:InsertText(\"#hoholm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/kill.gif' onclick='javascript:InsertText(\"#killlm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/wonder2.gif' onclick='javascript:InsertText(\"[?? ?lm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/flowerface.gif' onclick='javascript:InsertText(\"[flowerfacelm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/shocking.gif' onclick='javascript:InsertText(\"[shockinglm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/yipes.gif' onClick='javascript:InsertText(\"[yipeslm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/offtopic.gif' onClick='javascript:InsertText(\"[offtopiclm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/369.gif' onClick='javascript:InsertText(\"[369lm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/@.gif' onClick='javascript:InsertText(\"[@@lm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/hehe.gif' onClick='javascript:InsertText(\"#hehelm#\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/diu.gif' onClick='javascript:InsertText(\"[fuc klm]\",false);'>\
          <img class='clickicon' src='http://m.hkgolden.com/faces/lomore/sosad.gif' onClick='javascript:InsertText(\"[sosadlm]\",false);'>\
          </td>\
		  <td><img style='cursor:pointer; margin-top:-8px;' src='http://m.hkgolden.com/faces/lomore/bouncer.gif' onClick='javascript:InsertText(\"[bouncerlm]\",false);'></td>\
		  </tr></table></div>\
          <div id='myTab_Content4' style='display:none;'>\
          <table><tr><td>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/foreveralone.png' onclick='javascript:InsertText(\"[foreveralone]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/trollface.png' onclick='javascript:InsertText(\":trollface:\",false);' height='32'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/bitchplease.png' height='32' onclick='javascript:InsertText(\"[bitchplease]\",false);'>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/yuno.png' onclick='javascript:InsertText(\"[yuno]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/megusta.png' onclick='javascript:InsertText(\"[megusta]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fuckyea.png' onclick='javascript:InsertText(\"[fuc kyea]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/lol.png' onclick='javascript:InsertText(\"[lol]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fap.png' onclick='javascript:InsertText(\"[fap]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/soon.png' onclick='javascript:InsertText(\"[soon]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/seriously.png' onclick='javascript:InsertText(\"[seriously?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/truestory.png' onclick='javascript:InsertText(\"[truestory]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/jackiechan.png' onclick='javascript:InsertText(\"[jackiechan]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fullpanel.png' onclick='javascript:InsertText(\"[fullpanel]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/youdontsay.png' onclick='javascript:InsertText(\"[youdontsay?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ragepose.png' onclick='javascript:InsertText(\"[ragepose]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/soclose.png' onclick='javascript:InsertText(\"[soclose]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/feellikeasir.png' onclick='javascript:InsertText(\"[feellikeasir]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ymscare.png' onclick='javascript:InsertText(\"[ymscare]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/yesucan.png' onclick='javascript:InsertText(\"[yesucan]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/rufkingkiddingme.png' onclick='javascript:InsertText(\"[rufkingkiddingme?]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/deskflip.png' onclick='javascript:InsertText(\"[deskflip]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/okay.png' onclick='javascript:InsertText(\"[okay]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/no.png' onclick='javascript:InsertText(\"[no]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/fuuuu.png' onclick='javascript:InsertText(\"[fuuuu]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ohgodwhy.png' onclick='javascript:InsertText(\"[ohgodwhy]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/ifyouknowwhatimean.png' onclick='javascript:InsertText(\"[ifyouknowwhatimean]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/iknowthatfeelbro.png' onclick='javascript:InsertText(\"[iknowthatfeelbro]\",false);' height=32>\
		  <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/genius.png' onclick='javascript:InsertText(\"[genius]\",false);' height=32>\
          <img class='clickicon' src='http://jtvhkgicon.googlecode.com/svn/resources/gay.png' onclick='javascript:InsertText(\"[gaaaaaayyy]\",false);' height=32>\
          </td></tr></table></div>\
          <div id='myTab_Content5' style='display:none;'>\
          <table><tr><td>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c2b7132654a19e02-24x18.png' onclick='javascript:InsertText(\"R)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-13d54d9e49b593b3-24x18.png' onclick='javascript:InsertText(\":)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a3f5d14a3190ef1-24x18.png' onclick='javascript:InsertText(\":p\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-912125d7459226cc-24x18.png' onclick='javascript:InsertText(\";P\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e073a3348e028b40-24x18.png' onclick='javascript:InsertText(\"B)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-aa3dd5587f06bb7b-24x18.png' onclick='javascript:InsertText(\";)\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e9218a512e65b0de-24x18.png' onclick='javascript:InsertText(\"O_o\",false);'>\
		  <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-939757d7759f071f-24x18.png' onclick='javascript:InsertText(\":z\",false);'>\
		  <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2d2d0e6fdbc0b733-24x18.png' onclick='javascript:InsertText(\":(\",false);'>\
		  <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-67cde8d0b7916e57-24x18.png' onclick='javascript:InsertText(\"<3\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png' onclick='javascript:InsertText(\"Kreygasm\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png' onclick='javascript:InsertText(\"Kappa\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6b8d1be08f244e92-19x27.png' onclick='javascript:InsertText(\"RedCoat\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8b5aaae6e2409deb-20x27.png' onclick='javascript:InsertText(\"StoneLightning\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1903cc415afc404c-20x27.png' onclick='javascript:InsertText(\"TheRinger\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a7ee1bc0e5c9af0-21x27.png' onclick='javascript:InsertText(\"JKanStyle\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-41f8a86c4b15b5d8-22x27.png' onclick='javascript:InsertText(\"OptimizePrime\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-551cd64fc3d4590a-21x27.png' onclick='javascript:InsertText(\"CougarHunt\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-95eb8045e7ae63b8-18x27.png' onclick='javascript:InsertText(\"EagleEye\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-35ae4e0e8dd045e1-22x27.png' onclick='javascript:InsertText(\"BrokeBack\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-740242272832a108-30x30.png' onclick='javascript:InsertText(\"BionicBunion\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-521420789e1e93ef-18x27.png' onclick='javascript:InsertText(\"PazPazowitz\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png' onclick='javascript:InsertText(\"SwiftRage\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-39f055e707725b5d-18x27.png' onclick='javascript:InsertText(\"BrainSlug\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png' onclick='javascript:InsertText(\"DansGame\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png' onclick='javascript:InsertText(\"PJSalt\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a1a8bb5cdf6efb9-24x32.png' onclick='javascript:InsertText(\"MVGame\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1e3ccd969459f889-29x27.png' onclick='javascript:InsertText(\"BCWarrior\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ac61a7aeb52a49d3-39x27.png' onclick='javascript:InsertText(\"MrDestructoid\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce027387c35fb601-22x27.png' onclick='javascript:InsertText(\"PicoMause\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6aaca644ea5374c6-20x27.png' onclick='javascript:InsertText(\"JonCarnage\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3dac9659e838fab2-20x27.png' onclick='javascript:InsertText(\"StrawBeary\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2febb829eae08b0a-21x27.png' onclick='javascript:InsertText(\"GingerPower\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-92a1b848540e9347-23x27.png' onclick='javascript:InsertText(\"SuperVinlin\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f276ed33053ec70-32x32.png' onclick='javascript:InsertText(\"SMOrc\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d14278fea8fad146-19x27.png' onclick='javascript:InsertText(\"FreakinStinkin\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a5293e92212cadd9-21x27.png' onclick='javascript:InsertText(\"BlargNaut\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d530ef454aa17093-21x27.png' onclick='javascript:InsertText(\"KevinTurtle\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-179f310b0746584d-23x27.png' onclick='javascript:InsertText(\"NoNoSpot\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-58f4782b85d0069f-17x27.png' onclick='javascript:InsertText(\"SoBayed\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png' onclick='javascript:InsertText(\"SSSsss\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b85003ffba04e03e-24x24.png' onclick='javascript:InsertText(\"PunchTrees\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5342e829290d1af0-17x27.png' onclick='javascript:InsertText(\"UleetBackup\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e13a8382e40b19c7-18x27.png' onclick='javascript:InsertText(\"ArsonNoSexy\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a204e65775b969c5-27x27.png' onclick='javascript:InsertText(\"TehFunrun\",false);'>\
          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-89e474822a976928-19x27.png' onclick='javascript:InsertText(\"NinjaTroll\",false);'>\
          </td></tr></table></div>\
		  <div id='myTab_Content6' style='display:none; width:440px; height:165px; overflow-y:scroll;'><table><tbody><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[angelx]\",false)' src='http://m.hkgolden.com/faces/xmas/angel.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[xx (x]\",false)' src='http://m.hkgolden.com/faces/xmas/dead.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[)x]\",false)' src='http://m.hkgolden.com/faces/xmas/smile.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )x]\",false)' src='http://m.hkgolden.com/faces/xmas/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )jx]\",false)' src='http://m.hkgolden.com/faces/xmas/clown_jesus.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[(x]\",false)' src='http://m.hkgolden.com/faces/xmas/frown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[~(x]\",false)' src='http://m.hkgolden.com/faces/xmas/cry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[;x]\",false)' src='http://m.hkgolden.com/faces/xmas/wink.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:[x]\",false)' src='http://m.hkgolden.com/faces/xmas/angry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:]x]\",false)' src='http://m.hkgolden.com/faces/xmas/devil.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:dx]\",false)' src='http://m.hkgolden.com/faces/xmas/biggrin.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[Ox]\",false)' src='http://m.hkgolden.com/faces/xmas/oh.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[Px]\",false)' src='http://m.hkgolden.com/faces/xmas/tongue.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[^x^]\",false)' src='http://m.hkgolden.com/faces/xmas/kiss.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[??x]\",false)' src='http://m.hkgolden.com/faces/xmas/wonder.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#yupx#\",false)' src='http://m.hkgolden.com/faces/xmas/agree.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#ngx#\",false)' src='http://m.hkgolden.com/faces/xmas/donno.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hehex#\",false)' src='http://m.hkgolden.com/faces/xmas/hehe.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#lovex#\",false)' src='http://m.hkgolden.com/faces/xmas/love.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#ohx#\",false)' src='http://m.hkgolden.com/faces/xmas/surprise.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#a ssx#\",false)' src='http://m.hkgolden.com/faces/xmas/ass.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadx]\",false)' src='http://m.hkgolden.com/faces/xmas/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#goodx#\",false)' src='http://m.hkgolden.com/faces/xmas/good.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hohox#\",false)' src='http://m.hkgolden.com/faces/xmas/hoho.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#killx#\",false)' src='http://m.hkgolden.com/faces/xmas/kill.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#byex#\",false)' src='http://m.hkgolden.com/faces/xmas/bye.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[ZZx]\",false)' src='http://m.hkgolden.com/faces/xmas/z.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[@@x]\",false)' src='http://m.hkgolden.com/faces/xmas/@.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#adorex#\",false)' src='http://m.hkgolden.com/faces/xmas/adore.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#adore2x#\",false)' src='http://m.hkgolden.com/faces/xmas/adore2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[?x]\",false)' src='http://m.hkgolden.com/faces/xmas/wonder2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadx]\",false)' src='http://m.hkgolden.com/faces/xmas/banghead.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncerx]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncer.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[offtopicx]\",false)' src='http://m.hkgolden.com/faces/xmas/offtopic.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[censoredx]\",false)' src='http://m.hkgolden.com/faces/xmas/censored.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[flowerfacex]\",false)' src='http://m.hkgolden.com/faces/xmas/flowerface.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[shockingx]\",false)' src='http://m.hkgolden.com/faces/xmas/shocking.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[photox]\",false)' src='http://m.hkgolden.com/faces/xmas/photo.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipesx]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipes2x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipes3x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipes4x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes4.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369x]\",false)' src='http://m.hkgolden.com/faces/xmas/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bombx]\",false)' src='http://m.hkgolden.com/faces/xmas/bomb.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[slickx]\",false)' src='http://m.hkgolden.com/faces/xmas/slick.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fuckx]\",false)' src='http://m.hkgolden.com/faces/xmas/diu.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#nox#\",false)' src='http://m.hkgolden.com/faces/xmas/no.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#kill2x#\",false)' src='http://m.hkgolden.com/faces/xmas/kill2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#kill3x#\",false)' src='http://m.hkgolden.com/faces/xmas/kill3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#cnx#\",false)' src='http://m.hkgolden.com/faces/xmas/chicken.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#cn2x#\",false)' src='http://m.hkgolden.com/faces/xmas/chicken2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncyx]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncy.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncy2x]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncy2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#firex#\",false)' src='http://m.hkgolden.com/faces/xmas/fire.gif'>\
		  </td></tbody></table></div>\
		  <div id='myTab_Content7' style='display:none;'>\
		  <table><tbody>\
		  <tr><td colspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[)gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/smile.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[(gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/frown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[~(gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/cry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#yupgx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/agree.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadgx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#goodgx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/good.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#byegx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/bye.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fuc kgx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/diu.gif'>\
		  </td></tr>\
		  </tbody></table></div>\
		  <div id='myTab_Content8' style='display:none; margin-top:-10px;'>\
		  <table><tbody><tr><td colspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )2n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )3n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#a ssn#\",false)' src='http://m.hkgolden.com/faces/newyear/ass.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadn]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosad2n]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosad3n]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad3.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadn]\",false)' src='http://m.hkgolden.com/faces/newyear/banghead.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[banghead2n]\",false)' src='http://m.hkgolden.com/faces/newyear/banghead2.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[yipesn]\",false)' src='http://m.hkgolden.com/faces/newyear/yipes.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369n]\",false)' src='http://m.hkgolden.com/faces/newyear/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[3692n]\",false)' src='http://m.hkgolden.com/faces/newyear/3692.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fuckn]\",false)' src='http://m.hkgolden.com/faces/newyear/diu.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bouncern]\",false)' src='http://m.hkgolden.com/faces/newyear/bouncer.gif'>\
		  </td>\
		  <td valign='bottom' rowspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[offtopicn]\",false)' src='http://m.hkgolden.com/faces/newyear/offtopic.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[offtopic2n]\",false)' src='http://m.hkgolden.com/faces/newyear/offtopic2.gif'>\
		  </td></tr></tbody></table>\
		  </div>\
		  <div id='myTab_Content9' style='display:none;'>\
		  <table><tbody>\
		  <tr><td colspan='2'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[angelsk]\",false)' src='http://m.hkgolden.com/faces/sick/angel.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[o )sk]\",false)' src='http://m.hkgolden.com/faces/sick/clown.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:[sk]\",false)' src='http://m.hkgolden.com/faces/sick/angry.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[:]sk]\",false)' src='http://m.hkgolden.com/faces/sick/devil.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#yupsk#\",false)' src='http://m.hkgolden.com/faces/sick/agree.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#ngsk#\",false)' src='http://m.hkgolden.com/faces/sick/donno.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#cnsk#\",false)' src='http://m.hkgolden.com/faces/sick/chicken.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#a sssk#\",false)' src='http://m.hkgolden.com/faces/sick/ass.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[sosadsk]\",false)' src='http://m.hkgolden.com/faces/sick/sosad.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hohosk#\",false)' src='http://m.hkgolden.com/faces/sick/hoho.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#hoho2sk#\",false)' src='http://m.hkgolden.com/faces/sick/hoho2.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#killsk#\",false)' src='http://m.hkgolden.com/faces/sick/kill.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#byesk#\",false)' src='http://m.hkgolden.com/faces/sick/bye.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[@@sk]\",false)' src='http://m.hkgolden.com/faces/sick/@.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#adoresk# \",false)' src='http://m.hkgolden.com/faces/sick/adore.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadsk]\",false)' src='http://m.hkgolden.com/faces/sick/banghead.gif'>\
		  </td></tr>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[flowersk]\",false)' src='http://m.hkgolden.com/faces/sick/flowerface.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[shockingsk]\",false)' src='http://m.hkgolden.com/faces/sick/shocking.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[photosk]\",false)' src='http://m.hkgolden.com/faces/sick/photo.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"#firesk#\",false)' src='http://m.hkgolden.com/faces/sick/fire.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[369sk]\",false)' src='http://m.hkgolden.com/faces/sick/369.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"[fucksk]\",false)' src='http://m.hkgolden.com/faces/sick/diu.gif'>\
		  </td></tr>\
		  </tbody></table>\
		  </div>\
		  <div id='myTab_Content10' style='display:none;'>\
		  <table><tbody>\
		  <tr><td>\
		  <img class='clickicon' onclick='javascript:InsertText(\":$\",false)' src='http://forum.mess.be/style_emoticons/mess.be/msn_embarrassed.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(awkward)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/8.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(drooling)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/17.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(hush)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/20.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(lusty)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/22.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(disregard)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/30.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(flighty)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/31.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(shy)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/33.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(beat)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/34.gif'>\
		  <img class='clickicon' onclick='javascript:InsertText(\"(brilliant)\",false)' src='http://jtvhkgicon.googlecode.com/svn/resources/46.gif'>\
		  </td></tr>\
		  </tbody></table>\
		  </div>";
        chat_col.appendChild(hkgicon);
        }
}

function clearbackground()
{
//      document.body.style.backgroundImage = '';
//      document.body.style.cssText = 'background-color:#000 !important';
}

function meeboAdvert()
{
        var results = $$('m');
        results.each(function(element) {
                if(element.offsetLeft == 0 && element.style.cursor == "pointer") {
                        element.remove();
                        throw $break;
                }
        });
}

function over18bypass()
{
        var results = document.getElementsByTagName('input');
        for(var j = 0; j < results.length; j++)
        {
                if(results[j].value == "I am 18 or older") {
                        results[j].click();
                        break;
                }
        }
}

function over18bypassch()
{
        var results = document.getElementsByTagName('input');
        for(var j = 0; j < results.length; j++)
        {
                if(results[j].value == "我已經滿18歲") {
                        results[j].click();
                        break;
                }
        }
}
function filterGrowl()
{
        window.growl_ad = function() {};
        window.growl2 = window.growl;
        window.growl = function(text,extraclass,delay) {
                if(text.indexOf("ad-free page") != -1) {
                        bdebug.log("Ad-free popup blocked");
                        return;
                }
                window.growl2(text,extraclass,delay);
        };
}

function removeLogs()
{
        gaTrackEvent = function() { }
        log_stat = function() { }
}
function init()
{
        var loc = document.URL.toLowerCase();
        bdebug.log("CALL init "+loc);
        if(loc.indexOf("meebo.html") != -1) {
                bdebug.log("BetterJTV Load Aborted - Meebo Frame");
                return;
        }

        if(typeof($) === 'undefined') 
        {
                // prototype hasn't loaded yet, which means we've experienced the firefox bug
                // our firefox extension seems to call init() too early (before DOM is loaded), but it
                // calls it again later, so we can just ignore this one
                bdebug.log("BetterJTV Load Aborted - prototype isn't setup");
                return;
        }
        if(typeof(Array.prototype.each) === 'undefined')
        {
                bdebug.log("BetterJTV Load Aborted - prototype each isn't setup");
                return;
        }


        var locMatch = loc.match("^http:\/\/[^\/]*twitch\.tv\/");
        if(locMatch) {
                is_twitch = true;
                bdebug.log("Detected Twitch.TV");
        }

        has_chat = false;
        if(document.getElementById("chat_lines")) {
                has_chat = true;
                bdebug.log("Detected chat");
        }
        if(loc.indexOf("/chat/embed") != -1) {
				icon();
                has_body = false;
                bdebug.log("Detected missing body");
        } else {
                has_body = true;
        }

/*
        var betterjtv_stat = document.createElement('script');
        betterjtv_stat.type = 'text/javascript';
        betterjtv_stat.src = "http://www.betterjtv.com/p/stat.php?"+Math.random();
        var betterjtv_head = document.getElementsByTagName("head")[0];
        if(betterjtv_head) betterjtv_head.appendChild(betterjtv_stat);
*/
        setTimeout(delayed, 1000);

        if(has_body) {
                clearout();
                brand();
                icon();
                if(typeof iab_rma_video_complete == "function") iab_rma_video_complete();
                trypro();
                clearbackground();
                setTimeout(clearbackground, 1000);
                setTimeout(clearbackground, 2000);
                over18bypass();
                over18bypassch();
                filterGrowl();
                
                // broken
                meeboAdvert();
        }
        if(has_chat) {
                chat_resize();
                chat_moderator();
        }

//      fix190410();
//      banneroffset_fix();


}
function delayed()
{
        bdebug.log("CALL delayed");
        if(has_body) {
                clearout();
                trypro();
        }
        if(has_chat && !is_twitch) {
                bjtvbox();
        }
		if(is_twitch) {
				bttvbox();
		}
}



//setTimeout(init, 50);
init();
// we can do this immediately, because this script is always loaded AFTER domready

//function test() {
//window.IRC.insert_chat_line("tia_marie","tia_marie","",0,"BETTERJTVTEST","red",false,"","","",false);
//}
//setTimeout(test, 3000);

}();

function bjtv_action(action) {

if(action == "dark") {
        $$('body').each(function(element) {
                element.style.background = '#000';
        });
        $$('.col_bg').each(function(element) {
                element.style.background = '#000';
		});
		$$('.left_col').each(function(element) {
				element.style.color = '#FFF';
        });
		$$('.left_col a').each(function(element) {
				element.style.color = '#666';
        });
        $$('#chat_container').each(function(element) {
                element.style.background = '#000';
        });
        $$('#chat_lines').each(function(element) {
                element.style.background = '#000';
                element.style.color = '#FFF';
                //element.style.border = 'none';
        });
        $$('#iconset').each(function(element) {
                element.style.background = '#000';
                element.style.color = '#FFF';
                //element.style.border = 'none';
        });
        $$('#related').each(function(element) {
                element.style.background = '#000';
                element.style.color = '#FFF';
                //element.style.border = 'none';
        });
        $$('#chat_text_input').each(function(element) {
                element.style.background = '#333';
                element.style.color = '#FFF';
                element.style.border = 'solid 1px #666';
        });
        $$('#footer').each(function(element) {
                element.remove();
        });
        /*$$('#status').each(function(element) {
                element.style.border = 'none';
        });*/
	var status = document.getElementById("status_tab");
	if(status){status.setAttribute("style", "background:transparent;");}
	var description = document.getElementById("description_tab");
  	if(description){description.setAttribute("style", "background:transparent;");}
  	var badges = document.getElementById("badges_tab");
  	if(badges){badges.setAttribute("style", "background:transparent;");}
      var darkbutton = document.getElementById("darken");
      darkbutton.innerHTML='<span class="main">Back to normal</span>';
      darkbutton.removeAttribute("onclick");
      darkbutton.setAttribute("onclick", "bjtv_action('nodark');");
}
if(action == "nodark")  {
  if(location.href.split("/")[3] != "chat"){
  document.getElementsByTagName("body")[0].removeAttribute("style");
  document.getElementById("left_col").removeAttribute("style");
  document.getElementById("status_tab").removeAttribute("style");
  var description = document.getElementById("description_tab");
  if(description){description.removeAttribute("style");}
  var badges = document.getElementById("badges_tab");
  if(badges){badges.removeAttribute("style");}
  document.getElementById("chat_lines").removeAttribute("style");
  document.getElementById("chat_lines").style.height = "375px";
  document.getElementById("chat_container").removeAttribute("style");
  document.getElementById("chat_container").style.marginBottom = "200px";
  //document.getElementById("chat_container").style.marginTop = "5px";
  document.getElementById("related").removeAttribute("style");
  document.getElementById("iconset").removeAttribute("style");
  document.getElementById("iconset").style.marginLeft = "-5px";
  //document.getElementById("iconset").style.marginTop = "-5px";
  document.getElementById("iconset").style.width = "100%";
  document.getElementById("iconset").style.height = "200px";
  document.getElementById("chat_text_input").removeAttribute("style");
  document.getElementById("report_arrow").removeAttribute("style");
  document.getElementById("share_arrow").removeAttribute("style");
  $$('.left_col a').each(function(element) {
	  element.removeAttribute("style");
	  });
	$$('.col_bg').each(function(element) {
	  element.removeAttribute("style");
	  });
  //bjtv_action('trans');
var darkbutton = document.getElementById("darken");
darkbutton.innerHTML='<span class="main">Darken background</span>';
darkbutton.removeAttribute("onclick");
darkbutton.setAttribute("onclick", "bjtv_action('dark'); bjtv_action('notrans');");
}else{
  document.getElementsByTagName("body")[0].removeAttribute("style");
  document.getElementById("chat_lines").removeAttribute("style");
  document.getElementById("chat_lines").style.height = "328px";
  document.getElementById("iconset").removeAttribute("style");
  document.getElementById("iconset").style.marginLeft = "-5px";
  document.getElementById("chat_text_input").removeAttribute("style");
var darkbutton = document.getElementById("darken");
darkbutton.innerHTML='<span class="main">Darken background</span>';
darkbutton.removeAttribute("onclick");
darkbutton.setAttribute("onclick", "bjtv_action('dark');");
}
}

if(action == "clear") {
        $('chat_line_list').innerHTML = "";
        CurrentChat.admin_message("You cleared your own chat (JTV hkgicon)");
}

if(action == "notrans") {
	$$('.right_col_rnd').each(function(element) {
		element.style.opacity = '1';
		});
		var transbutton = document.getElementById("trans");
		if(transbutton){
		transbutton.innerHTML='<spac class="main">Enable Translucent Chat Column</span>';
		transbutton.removeAttribute("onclick");

		transbutton.setAttribute("onclick", "bjtv_action('trans');");
		}
}

if(action == "trans") {
	$$('.right_col_rnd').each(function(element) {
		element.style.opacity = '0.9';
		});
		document.getElementById("iconset").style.opacity = "1";
		var transbutton = document.getElementById("trans");
		if(transbutton){
		transbutton.innerHTML='<spac class="main">Disable Translucent Chat Column</span>';
		transbutton.removeAttribute("onclick");
		transbutton.setAttribute("onclick", "bjtv_action('notrans');");
		}
}
}

//bjtv_action("trans");

function changeTab(index)
{
	for (var i=1;i<=10;i++)
	{
		document.getElementById ("myTab"+i).className ="normal";
		document.getElementById ("myTab"+index).className ="selected";
		document.getElementById ("myTab_Content"+i).style.display  ="none";
	}
		document.getElementById ("myTab_Content"+index).style.display  ="block";
		document.getElementById('hkg3').selectedIndex = 0;
}
      
function InsertText( text, splittable ) {
        var TextArea = document.getElementById("chat_text_input");
        var l;
        if (TextArea) {
                TextArea.focus();
                if (splittable)
                        l = text.split(/,/);
                else
                        l = text
                        
                if ((typeof TextArea.selectionStart) != 'undefined') {  // Mozilla
                        var ti = TextArea.selectionEnd, ts = TextArea.selectionStart;   // Copied from the Glomerulus
                        if (l instanceof Array) {
                                if (ti != ts) {
                                        TextArea.value = TextArea.value.substring(0, ts) + l[0] + TextArea.value.substring(ts, ti) + l[2] + TextArea.value.substr(ti);
                                        TextArea.selectionStart = ts + l[0].length
                                        TextArea.selectionEnd = ti + l[2].length - 1;
                                } else {
                                        TextArea.value = TextArea.value.substring(0, ts) + l[0] + l[1] + l[2] + TextArea.value.substr(ti);
                                        TextArea.selectionStart = ti + l[0].length;
                                        TextArea.selectionEnd = TextArea.selectionStart + l[1].length;
                                }
                        } else {
                                TextArea.value = TextArea.value.substring(0, ts) + " " + l + TextArea.value.substr(ti);
                                TextArea.selectionStart = TextArea.selectionEnd = ti + l.length + 1;
                        }
                } else if (document.selection) {                                                // IE
                        var r = document.selection.createRange();                       // No Glomerulus here ;-(
                        if (l instanceof Array) {
                                if (r.text != "")
                                        r.text = l[0] + r.text + l[2];
                                else
                                        r.text = l[0] + l[1] + l[2];
                        } else
                                r.text = l + " ";
                        //r.select();                                                                           // Useless
                } else {                                                                                                // Neither.
                        TextArea.value += text + " ";
                }
                TextArea.focus();
        }
        //return false;
        document.getElementById('fc').selectedIndex = 0;
        document.getElementById('fs').selectedIndex = 0;
}

function nomod(){
	var modicon = document.getElementById("mod_icons");
	if(modicon){
	if(modicon.checked = "true"){
	modicon.click();
	}
	}
}

function timer(){
	if(location.href.split("/")[3] != "chat"){
		setInterval("setupZoom()", 100)
	}
	setTimeout("nomod(); changeTab(6);", 5000)
}