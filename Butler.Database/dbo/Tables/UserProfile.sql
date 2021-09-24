﻿CREATE TABLE [dbo].[UserProfile]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[UserId] nvarchar(128),
	[FirstName] nvarchar(max),
	[LastName] nvarchar(max),
	[Email] nvarchar(max),
	[ProfileImageUrl] nvarchar(max),
	[UserName] nvarchar(max),
	[FullName] nvarchar(max),
	[Address] nvarchar(max),
	[Contact] nvarchar(max),
	[UserType] int,
	[IsActive] bit not null default(0),
	[CNICFrontImageUrl] nvarchar(max),
	[CNICBackImageUrl] nvarchar(max),
	[ApprovalStatus] bit not null  default(0),
	[ReferenceId] int,
	[ControllerCenterId] int,
	[Date] datetime,
	[IsAdded] bit not null default(0),
	Constraint [FK_UserProfile_User] foreign key ([UserId]) References [dbo].[AspNetUsers] ([Id]),
)