#!/bin/bash

pkgs="
com.brave.Browser
com.discordapp.Discord
com.spotify.Client
io.github.mimbrero.WhatsAppDesktop
org.videolan.VLC
us.zoom.Zoom
"

flatpak install $pkgs -y
