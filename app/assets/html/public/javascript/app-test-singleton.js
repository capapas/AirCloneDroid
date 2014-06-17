$(function () {
	var software = (function(){
		var constructeur = function(){
			this.id = null;
			this.label = null;
			this.icon = null;
			this.uri = null;
			
			this.generateWindow = function(){
				if(null != this.id){
					var attrId = 'sw_'+this.id;
					$('#desktop').append('<div id="'+attrId+'" class="window"><div class="header"><img class="icon" src="'+this.icon+'"/><h4 class="title">Contact</h4><div class="command"><a class="min"></a><a class="max"></a><a class="close"></a></div></div><div class="content"></div></div>');
					$('#'+attrId).draggable().resizable({ handles: "all", alsoResize: '#'+attrId+' .content', minWidth: '287' });
					$('#'+attrId+' .content').load(this.uri);
					$('#'+attrId+' .close').click(function(){
						w2ui[attrId+'Layout'].destroy();
						$('#'+attrId).remove();
					});
				}
				else
					console.log();
			}
			this.generateIcon = function(){
				$('#shortcut-area').append('<div id="icon_'+this.id+'" class="desktop-shortcut"><img src="'+this.icon+'" /><p>'+this.label+'</p></div>');
			}
			var methodePrivee = function(){
			}
		}

		var instance = null;
		return new function() {
			this.getInstance = function() {
				if (instance == null) {
					instance = new constructeur();
					instance.constructeur = null;
				}
				return instance;
			}
		}
	})();
});