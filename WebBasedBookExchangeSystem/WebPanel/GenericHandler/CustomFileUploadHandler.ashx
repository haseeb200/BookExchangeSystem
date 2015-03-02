<%@ WebHandler Language="C#" Class="CustomFileUploadHandler" %>

using System;
using System.Web;
using System.IO;

public class CustomFileUploadHandler : IHttpHandler
{
    private string fileName, savePath;

    public void ProcessRequest(HttpContext context)
    {
        UploadFile(context);
    }

    private void UploadFile(HttpContext context)
    {

        if (context.Request.Form.Count > 0)
        {
            fileName = context.Request.Form[0];
            savePath = context.Server.MapPath("~/BookImages/" + fileName);
            if(File.Exists(savePath))
                File.Delete(savePath);
        }

        else if (context.Request.Files.Count > 0)
        {
            fileName = context.Request.Files[0].FileName.ToString();
            savePath = context.Server.MapPath("~/BookImages/" + fileName);
            context.Request.Files[0].SaveAs(savePath);
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}