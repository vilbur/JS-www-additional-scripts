/**  Concat '*.js' files in 'source' directory
  *  Name of concacted file is current dir name
  *
  * @example #path_source=C:\scripts\foo_script\source\.*js
  * @example #path_output=C:\scripts\foo_script\foo_script.js
  *
 */
SplitPath, A_ScriptDir, $dir_name

$path_source	= %A_ScriptDir%\source\
$path_output	= %A_ScriptDir%\%$dir_name%.js

 
FileDelete, %$path_output% 


Loop, %$path_source%\*.js`
{
  FileRead, $aFileContents, %A_LoopFileFullPath% 
	;MsgBox,262144,aFileContents, %$aFileContents%,3 
  FileAppend, %$aFileContents%, %$path_output% 

}