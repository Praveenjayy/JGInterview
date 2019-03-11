USE [JGBS_Interview]
GO
/****** Object:  StoredProcedure [dbo].[DeleteInstallUsers]    Script Date: 3/12/2019 12:19:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Yogesh
-- Create date: 19 Jan 2017
-- Description:	Deletes install users.
-- =============================================
ALTER PROCEDURE [dbo].[DeleteInstallUsers]
	@IDs IDs READONLY
AS
BEGIN
	
	-- Deleting the related record(s) from Child Table before deleting the Parent Table
	DELETE 
	FROM dbo.tblTaskAssignedUsers
	WHERE UserId IN (SELECT Id FROM @IDs)

	-- Deleting the related record(s) from Parent Table after deleting depedent record from the Child Table
	DELETE
	FROM dbo.tblInstallUsers 
	WHERE Id IN (SELECT Id FROM @IDs)
	
 END

