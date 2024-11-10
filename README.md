# UClass

## Inspiration

As a freshman, I've felt that some of my classes lacked community. While there are some classes that are talkative and easy to find new people in, others don't have that same social setting. This inspired me to build UClass, a platform that is not only a productivity tool but also a way for everyone to connect within their classes.

## What it does

UClass is a mobile app where users can see their class schedule, meet classmates, as well as view their other friends' schedules. In order to source users' schedules, they use the UClass chrome extension which lets you upload your schedule just by simply viewing it on spire. From there, UClass combines your data with other students to determine who your classmates are so you can connect more easily.

## How I built it

The UClass project is composed of two parts: a mobile app and a chrome extension.

The mobile app is written in JavaScript with the React Native framework. It uses React Navigation for tab and stack UI flow, FontAwesome for icons, Supabase for authentication and data storage, and AsyncStorage for JWT storage.

The chrome extension is written in JavaScript with the React framework. It uses Groq's natural language processing AI to parse schedules from the webpage, FontAwesome for icons, Supabase for authentication and data storage, and chrome's built-in trigger system to communicate between the popup and web scraper.

The backend uses a SQL database hosted through Supabase as well as email authentication managed by Supabase.

## Challenges I ran into

Where to start...
* chrome extension failing to communicate between popup and content script
* filtering down all the weird spire DOM elements to make sure I have a valid schedule
* prompt engineering groq to parse json
* binding the auth and profiles table in Supabase (I don't know SQL so this was brutal)
* building the schedule UI
* working with messy AI generated schedule data
* determining classmates

## Accomplishments that I'm proud of

The easy auth process for users, using groq in an innovative way, the UI.

## What I learned

SQL, Supabase, chrome extension packaging

## What's next for UClass

Hopefully I can upload UClass to the iOS Appstore and Chrome Web Store. In the future I'd also like to reimplement some of the logic I did this weekend better since there's a lot of stuff that's sloppy or inefficient.