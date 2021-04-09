#!/bin/bash

# osascript -e ' tell application "Terminal"
# 	if not (exists window 1) then reopen
# 	activate
# 	do script "cd ~/Documents/projects/thoughtbubble-monorepo/thoughtbubble-api && npm run server" in tab 1 of front window
# 	my makeTab()
# 	do script "cd ~/Documents/projects/thoughtbubble-monorepo/thoughtbubble-vscode && npm run watch-ext" in selected tab of front window
# 	my makeTab()
# 	do script "cd ~/Documents/projects/thoughtbubble-monorepo/thoughtbubble-vscode && npm run watch-view" in selected tab of front window
# end tell

# on makeTab()
# 	tell application "System Events" to keystroke "t" using {command down}
# 	delay 0.2
# end makeTab'

apiPath="~/Documents/projects/thoughtbubble-monorepo/thoughtbubble-api"
vscodePath="~/Documents/projects/thoughtbubble-monorepo/thoughtbubble-vscode"

open -a iTerm # (redundant if already open)

osascript -e 'tell application "iTerm"
	if not (exists current window)
		activate
	end
	if (exists current window)
		tell current window
			create tab with default profile
		end tell
	end
	tell current session of current window
		split horizontally with default profile
		split vertically with default profile
	end tell

	tell first session of current tab of current window
		write text "cd '$vscodePath' && npm run watch-ext"
	end tell

	tell second session of current tab of current window
		write text "cd '$vscodePath' && npm run watch-view"
	end tell

	tell third session of current tab of current window
		write text "cd '$apiPath' && npm run server"
	end tell
end tell'


# to find and kill nodemon on port x if accidently close term w/o end process: lsof -i :{PORT} -> kill -15 {PID}