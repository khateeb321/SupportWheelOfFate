# Welcome to StackEdit!

Demo application to randomly select two Engineers by spining the wheel. Project and Code itself is demonstration of the project.


# How to Run
NPM must be install before following steps

 1. Clone the repo
 2. Open cmd in 'SupportWheelOfFate.Web' folder
 3. Run 'npm install', then run 'npm install -g bower' and 'npm install grunt -g'
 4. Run 'bower install'
 5. Run 'grunt dev'
 6. Open Visual Studio and write your connection string in 'SupportWheelOfFate.Data > WheelOfFaithContext' file.
 7. Open 'Nuget Manager Console' and run 'Update-Database' command.

## Technologies

 1. .NET and C#
 2. ASP.NET Web API For Back End
 3. Entity Framework - Model First Approach
 4. Angularjs - Front End Framewrok
 5. Grunt for Automation
 6. Bower and NPM for Managing packages

## Folder Structuring

 - **SupportWheelOfFate.Web** - Persentation Layer
 - **SupportWheelOfFate.Data** - Data Access Layer
 - **SupportWheelOfFate.Model** - DB Context / Entities / Models
 - **SupportWheelOfFate.Interfaces** - Interfaces

## Demo

Application is deployed on Microsoft Azure
**Link:** http://wheeloffaith.ukwest.cloudapp.azure.com/wheeloffaith/default.html#/home