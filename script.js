var vol = 0;
var songs = [];
var lastPlay=-1;

$( () => {
	

	var audio = document.getElementById('audio');
	audio.addEventListener('timeupdate',function()
		{
			var seconds = this.currentTime % 60;
			var foo = this.currentTime - seconds;
			var minutes = foo / 60;
			minutes = minutes < 9 ? "0" + minutes.toString() : minutes;
			seconds = seconds < 9 ? "0" + seconds.toFixed(0).toString() : seconds.toFixed(0);
			var fixedCurrentTime = minutes + ":" + seconds;
			$('#currtime').html( fixedCurrentTime );

			var scorrPercent = this.currentTime * 100 / this.duration ;
			$('#timer').val( scorrPercent );
		},false);

		speed();
		volume();
});


function totTime()
{
	var audioElement = document.getElementById('audio');                       
	var duration = audioElement.duration;
	
	
	var minutes = Math.floor(duration / 60);
	var seconds = duration - minutes * 60;

	var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);	
	$('#endtime').html(finalTime);
}

function str_pad_left(string,pad,length)
{
	return (new Array(length+1).join(pad)+string).slice(-length);
}


function playpause()
{
	var audioEl = document.getElementById('audio');

	if( audioEl.paused )
		{
			$('#audiosbl').removeClass("fa-play-circle");
			$('#audiosbl').addClass("fa-pause-circle");
		}
	else
		{
			$('#audiosbl').addClass("fa-play-circle");
			$('#audiosbl').removeClass("fa-pause-circle");
		}
	
	audioEl = audioEl.paused ? audioEl.play() : audioEl.pause();
}


function volume()
{
	var val = $('#volume').val();
	var audio = document.getElementById( 'audio' );
	audio.volume = val/100;
	vol = val;
	$('#volval').html( val );
}


function speed()
{
	var val = $('#speedrange').val();
	var audio = document.getElementById( 'audio' );
	audio.playbackRate = val;
	$('#speedval').html( val );
} 


function mute()
{
	if( $('#audio').prop('muted') )
		{
			$('#audioico').addClass( "fa-volume-up" );
			$('#audioico').removeClass( "fa-volume-mute" );
			$('#audio').prop( 'muted', false );
			$('#volval').html( vol );
			$('#volume').val( vol );
		}
	else
		{
			$('#audioico').removeClass( "fa-volume-up" );
			$('#audioico').addClass( "fa-volume-mute");
			$('#audio').prop( 'muted', true );
			$('#volval').html( "0" );
			$('#volume').val( 0 );
		}
}


function loop()
	{
		if( $('#audio').prop('loop') )
		{
			$('.fa-sync-alt').css( 'color', "white" );
			$('#audio').prop('loop', false );
		}
	else
		{
			$('.fa-sync-alt').css( 'color', "#007bff" );
			$('#audio').prop('loop', true );
		}
	}



function browseResult(e){
  var fileselector = document.getElementById('fileselector');

	for( let file in fileselector.files )
		{
			$('#list').append('<a style="padding-left:100px;" class="list-group-item list-group-item-dark" id="item-'+file+'" onclick="loadSong(' + file + ')"><i class="fas fa-music"></i>' + fileselector.files[file].name.split('.').slice(0, -1).join('.') + '</a>')
			songs.push(fileselector.files[file])
		}
}


function loadSong( file )
	{
		var sound = document.getElementById( "audio" );
		sound.src = URL.createObjectURL( songs[file] );
		setTimeout( function() 
			{
				totTime();
				$('#audiosbl').removeClass("fa-play-circle");
				$('#audiosbl').addClass("fa-pause-circle");
				var audioEl = document.getElementById('audio');
				$('#timer').val( 0 );
				$('#title').text( songs[file].name.split('.').slice(0, -1).join('.') );
			}, 500 );
		
		$('#item-'+ lastPlay).removeClass('active');
		$('#item-' + file).addClass( 'active' );
		lastPlay = file;
	}


function next()
	{
		if( lastPlay != (songs.length)-1 )
			{
				loadSong( lastPlay+1 );
			}
	}

function back()
	{
		if( lastPlay != 0 )
			{
				loadSong( lastPlay-1 );
			}
	}
