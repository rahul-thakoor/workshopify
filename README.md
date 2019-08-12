# Workshopify

> A set of tools to make running workshops less tedious

⚠️ This project is still WIP ⚠️

## Motivation

I often organise workshops at meetups and conferences. This project aims to solve some of the problems I usually run into while preparing or running workshops, for instance:

1. Setting up development environments on participants' computers such as installing drivers, downloading tools and sample projects can waste a significant amount of time.

2. Configuring several settings such as wifi credentials, networking and more is not always easy when running workshops at different locations

3. Keeping updated workshop materials and tools

4. Restrictions of some services where workshops are being run.

5. No connectivity. It would be useful to just create a hotspot and allow participants to use a web interface for accessing necessary assets

## How it works?

This project is meant to be set up on a Raspberry Pi. The Raspberry Pi hosts all of the necessary tools and assets required for running a workshop smoothly.

Also, Raspberry Pis with built-in WiFi or compatible dongles can be set up to host a hotspot.

Participants are given instructions on how to access a particular workshop instance. They typically access it using a browser on their computer.

While the projects can be installed directly on a Raspberry Pi running Raspbian or other linux distribution, the project is best deployed using Balena.

## Why Balena?

_Balena is a complete set of tools for building, deploying, and managing fleets of connected Linux devices._ Because running workshops can be CPU and memory intensive, you might need to set up several Raspberry Pis and restrict the number of concurrent participants using them.

Managing several devices becomes quite trivial with Balena. You can set individual settings for each device. Also, all the devices can be managed from a single dashboard.

Balena makes it also very easy to deploy different containers for different use cases. Adding new services or updating/removing existing ones is just a matter of changing the docker configuration files.

More details about balena can be found [here](https://www.balena.io/what-is-balena/).

## Workshops

1. Nodebots with the ESP8266
2. [ToDo] Sense Hat Emulator
3. [ToDo] Web BLE
4. [ToDo] Gobot
5. [ToDo] Firmata Playground
