Chạy trong Package Manager Console (Default project = TechKidPro.Data, Startup = TechKidPro.Web):

    Enable-Migrations
    Add-Migration Initial
    Update-Database

Trong Configuration.Seed gọi `DatabaseSeeder.SeedRoles(context);`
