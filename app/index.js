var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
	constructor: function  () {
		generators.Base.apply(this,arguments);
	},
	initializing: function(){
		this.log("----------初始化完成---------");
	},
	// prompting: function(){
	// 	var cb = this.async();

	// 	var askForClassNum = {
	// 		type: 'input',
	// 		name: "classNum",
	// 		message: '你希望创建多少个知识点:',
	// 		default: 4,
	// 		filter: function(classNum){
	// 			return parseInt(classNum);
	// 		}
	// 	};
	// 	var askForUseless = {
	// 		type: 'input',
	// 		name: 'isUseLess',
	// 		message: '是否使用Less编写CSS代码(Y/N):',
	// 		default: false,
	// 		filter: function(isUseLess){
	// 			return isUseLess === "Y" || isUseLess === 'y'
	// 		}
	// 	}
	// 	var askForIsCompress = {
	// 		type: 'input',
	// 		name: 'isCompress',
	// 		message: '是否希望压缩你的CSS代码(Y/N)',
	// 		default: false,
	// 		filter: function(isCompress){
	// 			return isCompress === "Y" || isCompress === 'y'
	// 		}
	// 	}


	// 	var prompts = [askForClassNum,askForUseless,askForIsCompress];



	// 	this.prompt(prompts,function(props){

	// 		this.isCompress = props.isCompress;
	// 		this.isUseLess = props.isUseLess;

	// 		this.log("----------创建的知识点是"+props.classNum+"个---------");
	// 		cb();

	// 	}.bind(this));

	// },
	prompting: function(){
		var cb = this.async();

		var prompts = [];
		for (var i = 0; i < 4; i++) {
			prompts.push({
				type: 'input',
				name: 'className'+i,
				message: '第'+i+'个知识点的名字是:',
				default: "class"+i
			});
		};


		this.prompt(prompts,function(props){
			var className = [];
			for (var i = 0; i < 4; i++) {
				className.push(props['className'+i]);
			};
			this.className = className;
			cb();

		}.bind(this));
	},
	configuring:function(){
		this.log("----------开始生成配置文件----------");
		//this.template("_Gulpfile.js", 'package.json');
		this.fs.copyTpl(
			this.templatePath('_Gulpfile.js'),
			this.destinationPath('./Gulpfile.js'),
			{
				isUseLess: true,
				isCompress: true
			}
		);
		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('./package.json'),
			{
				isUseLess: true,
				isCompress: true
			}
		);
	},
	writing: function(){
		
		this.log("----------开始生成JS,CSS----------");
		var dir = ['js','css'];

		dir.forEach(function(pwd){
			mkdirp(pwd);
		}.bind(this));

		//copy js folder
		var copyDir = [{
			src:'package/js',
			dest:'./package/js'
		}, {
			src:'package/css',
			dest:'./package/css'
		},{
			src:"package/less",
			dest:'./package/less'
		}];

		copyDir.forEach(function(dir){
			this.directory(dir.src,dir.dest);
		}.bind(this));

		
		this.log("----------开始生成audio,image,video----------");
		var scoDir = ['audio','image','video'];
		for (var i = 1; i <= 4; i++) {
			scoDir.forEach(function(scoDir){
				mkdirp('./package/sco/'+scoDir+'/common');
				mkdirp('./package/sco/'+scoDir+'/'+scoDir+'-'+i);
			}.bind(this));

		};
		//html
		for (var i = 1; i <=3; i++) {
			this.fs.copyTpl(
				this.templatePath('package/class'+i+".html"),
				this.destinationPath('./package/class'+i+'.html'),
				{
					className: this.className
				}
			);
		};

		this.fs.copyTpl(
			this.templatePath('package/dong_shou_xue.html'),
			this.destinationPath('./package/dong_shou_xue.html'),
			{
				className: this.className
			}
		);

	}
	// tips:function(){
	// 	this.log('----------创建的四个知识点分别是----------');
	// 	for (var i = 0; i < 4; i++) {
	// 		this.log('知识点1：'+this.className[i]);
	// 	};
	// }
});