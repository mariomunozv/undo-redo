// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

formState={
	init:function(){
		// add to onload
		if(!formState.onloadAdded){
			formState.onloadAdded=true;
			(function(){var ol=onload;onload=function(){if(ol){ol()};formState.init()}})();
			return
		};
		// modify/create event handlers on all form elements
		var f=document.forms
		for(var i=0;i<f.length;i++){
			var e=f[i].elements;
			for(var j=0;j<e.length;j++){
				(function(){
					var eh='onchange';
					eh=e[j].type=="radio"?'onclick':eh;
					eh=e[j].type=="checkbox"?'onclick':eh;
					eh=e[j].type=="text"?'onkeyup':eh;
					eh=e[j].type=="textarea"?'onkeyup':eh;
					var oc=e[j][eh] // evento onchange, onclick, etc para el elemento Ej en el formulario.
					var fo=f[i];    // el formulario al que pertenece el elemento
					e[j][eh]=function(){
						if(oc){oc()};
						formState.store(fo);
					};
				})();	
			};
			this.store(f[i]);
		}
	},
	store:function(f){
		// guarda los cambios de un form

		var a=f.cloneNode(true);
		if (a.elements.length==0){ 
			this.Safari=true;
			a.style.display="none";	a.id="formStateSafFix";f.parentNode.appendChild(a);
		};
		a.formStatePrev=f.formStatePrev;
		this.readBack(f,a);
		if(!f.formStateMem){f.formStateMem=[];f.formStateCo=0};
		f.formStateCo++;
		while(f.formStateMem.length>f.formStateCo){f.formStateMem.pop()};
		f.formStateMem[f.formStateCo]=a;
		this.checkQueue(f)
	},
	readBack:function(f,a){
		// read back values to form and check if different
		var fe=f.elements, ae=a.elements, d=false;
		for(var i=0;i<fe.length;i++){
			d=d || ae[i].checked!=fe[i].checked;
			ae[i].checked=fe[i].checked;
			// Safari textarea.values can not be read if style.display="none"
			// let's do another workaround and use "valueHolder" instead
			var ap=a.id=="formStateSafFix"?"valueHolder":"value";
			var fp=f.id=="formStateSafFix"?"valueHolder":"value";
			d=d || ae[i][ap]!=fe[i][fp];
			ae[i][ap]=fe[i][fp];
		};
		return d
	},
	checkQueue:function(f){
		// check if we currently can undo/redo anything
		var undoable=f.formStateCo>1;
		var redoable=f.formStateMem.length-f.formStateCo>1;
		if(f.elements.Undo){f.elements.Undo.disabled=!undoable};
		if(f.elements.Redo){f.elements.Redo.disabled=!redoable};
	},
	undo:function(a,r){
		if(!r){r=-1};
		var tN=a.tagName.toLowerCase()||"";
		if(a.parentNode && tN!="form"){a=a.parentNode;return this.undo(a,r)};
		if(!a.formStateMem){return false};
		var f=a.formStateMem[a.formStateCo+r];
		if(!f){return false};
		a.formStateCo+=r;
		if(!this.readBack(f,a)){return this.undo(a,r)};
		this.checkQueue(a);
		return true
	},
	redo:function(a){return this.undo(a,1)}
};





var elemnetos = $('tabla').elements;



$('[asd=cbipeliculas]').on('click',function(){
	alert("asd");
});