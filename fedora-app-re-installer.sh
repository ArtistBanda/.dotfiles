#!/bin/bash
 
pkgs="
Packages installed by user
Thunar-4.16.11-2.fc37.x86_64
aajohan-comfortaa-fonts-3.101-5.fc37.noarch
alacritty-0.10.1-3.fc37.x86_64
anaconda-37.12.6-1.fc37.x86_64
anaconda-install-env-deps-37.12.6-1.fc37.x86_64
anaconda-live-37.12.6-1.fc37.x86_64
arandr-0.1.10-13.fc37.noarch
autoconf-2.71-4.fc37.noarch
automake-1.16.5-9.fc37.noarch
blueman-1:2.3.5-1.fc37.x86_64
cairo-devel-1.17.6-2.fc37.x86_64
chkconfig-1.21-1.fc37.x86_64
dracut-live-057-5.fc37.x86_64
dunst-1.9.0-2.fc37.x86_64
feh-3.9.1-1.fc37.x86_64
fish-3.6.0-1.fc37.x86_64
flameshot-12.1.0-2.fc37.x86_64
gcc-c++-12.2.1-4.fc37.x86_64
gedit-2:43~alpha-2.fc37.x86_64
golang-1.19.6-1.fc37.x86_64
gparted-1.4.0-2.fc37.x86_64
i3-4.22-3.fc37.x86_64
initscripts-10.17-1.fc37.x86_64
kitty-0.26.5-3.fc37.x86_64
neofetch-7.1.0-8.fc37.noarch
neovim-0.8.3-1.fc37.x86_64
pavucontrol-5.0-7.fc37.x86_64
picom-10.2-1.fc37.x86_64
polybar-3.6.3-3.fc37.x86_64
rofi-1.7.5-1.fc37.x86_64
s-tui-1.1.4-1.fc37.noarch
scrot-1.8.1-1.fc37.x86_64
snapd-2.58.3-1.fc37.x86_64
solaar-1.1.8-1.fc37.noarch
sqlite-3.40.0-1.fc37.x86_64
zsh-5.9-2.fc37.x86_64
"
 
sudo dnf install $pkgs
