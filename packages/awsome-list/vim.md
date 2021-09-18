### Summary
operator + motion = operation
duplicated operator applies to current line.
### command
`x` delete selected char  
`.` repeat operation  
`>G` shift current to end line  
`h` left  
`k` up  
`j` down  
`l` right  
`$` move to line end  
`a` append after cursor  
`A` append at line end  
`cl`|`s` clear letter  
`c$`|`C` clear from current to line end  
`S`|`^c` clear from beginning  
`I` insert at biginning    
`o` insert after current line  
`O` insert before current line  
`f{char}` find char in current line  
`;` repeat finding char command in order   
`,` repeat finding char command in reverse order  
`/pattern<CR>` global search in order  
`?pattern<CR>` global search in reverse order   
`n` next global search  
`N` previous global search  
`:s/target/replacement` replace first mached string  
`&`  Repeat replacement  
`*`  Search current word   
`cw` Clear current to word end, then insert  
`db` Delete back to word start   
`x` Delete current char  
`b` Back to word start   
`dw` Delete to word end  
`daw` Delete a word  
`<C-a>` Increase number value  
`<C-x>` Decrease number value  
`180<C-x>` Decrease 180  
`yy` Copy current line  
`p` Paste  
`yt,` Copy until ',' into register 0  
`<C-r>0` Past text in register 0  
`gUit` Make tag content into uppercase  

### Operator
`c` Clear  
`d` Delete
`y` Yank  
`g~` Toggle uppercase and lowercase  
`gu` To lowercase  
`gU` To uppercase  
`>`  Increase indent  
`<`  Decrease indent  
`>>` Duplicated operator can apply to current line  

### Insert Mode Command
`<C-h>` Delete previous char  
`<C-w>` Delete until word beginning  
`<C-u>` Delete until line beginning  
`Esc` Return to normal mode  
`<C-[>` Return to normal mode  
`<C-o>` Return to normal mode temporarily  
`<C-r>=6*35<CR>` Insert a calculated value  
`<C-v>065` Insert ascii char  
`<C-v>u{1234}` Insert unicode char  

### Replace Mode
`R` Enter replace mode

### View Mode
`v` view mode for char  
`V` view mode for line  
`<C-v>` view mode for vertical block  
`gv` To previous view selection  
`o` Switch between view beginning and end  
`b` Back to word beginning  
`e` To word end  
`vit` Select content in tag  
`U` To uppercase  
`r|` Replace selection with |  
`c` Clear selection, then enter insert mode. After exit insert mode, all selections will be replaced   
`A` Append at selection end   


### Command Line
`:[range]delete [x]` Move lines in range into x register   
`:[range]yank [x]` Copy lines into x register   
`:[line]put [x]` Move to line below from x register  
`:[range]copy {address}` Copy lines in range into target line below   
`:[range]move {address}` move lines in range into target line below  
`:[range]join` Join lines in range  
`:[range]normal {commands}`  Execute normal command in range of lines   
`:[range]substitute/{pattern}/{string}/[flags]` Replace in range of lines  
`:[range]global/{pattern}/[cmd]` Execute global command on matched lines in range  
`:1` Move cursor to line 1  
`:$` Move cursor to end line.  
`:2,5` Line 2 to 5  
`:.` Current line  
`:%` All lines   
`:%s/test1/correct/` Replace 'test' with 'correct' in page  
`:'<,'>` Highlight range  
`:/<html>/,/<\/html>/`  Content between '\<html>' and '\</html>'  
`:.,.+3` Current to current + 3 line  
`:6copy.` `:6t.` Copy line6 to current line below  
`:'<,'>t0`  Copy highlighted range to beginning  
`:[range]move{address}` Move line range to target address   
`:'<,'>normal .` Repeat normal operation  
`@:`  Redo previous command  
`:write | !ruby %` Excute whole page using ruby interpretor  
`p:` Popup command editor  
`q/` Enter search command editor  
`<Ctrl-f>` From command line to command editor  