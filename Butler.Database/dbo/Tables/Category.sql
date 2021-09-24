CREATE TABLE [dbo].[Category]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[Name] nvarchar(max),
	[Description] nvarchar(max),
	[ContolCenterId] int,
	[CreatedAt] datetime,
	[CreatedBy] nvarchar(max),
	[Date] datetime, 
	[IsAdded] bit not null default(0),
    CONSTRAINT [FK_Category_ContolCenter] FOREIGN KEY ([ContolCenterId]) REFERENCES [dbo].[ControlCenter]([Id]),

)
