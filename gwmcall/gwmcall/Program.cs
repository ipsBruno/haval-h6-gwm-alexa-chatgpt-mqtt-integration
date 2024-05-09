

using System.Security.Cryptography.X509Certificates;

using System.Text.Json;
using System.Dynamic;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System;
namespace gwmcall
{
    class Program
    {

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
        static async Task Main(string[] base64Args)
        {
          
            var handler = new Handler();
            var certWithKeyExport = handler.CertificateWithPrivateKey;

            dynamic stuff = Newtonsoft.Json.JsonConvert.DeserializeObject(Base64Decode(base64Args[0]));

            
            var httpHandler = new HttpClientHandler();
            httpHandler.ClientCertificateOptions = ClientCertificateOption.Manual;
            using (var cert = handler.CertificateWithPrivateKey)
            {
                var pkcs12 = new X509Certificate2(cert.Export(X509ContentType.Pkcs12));
                httpHandler.ClientCertificates.Add(pkcs12);
            }

            var request = JsonConvert.SerializeObject(stuff["body"]);

            var content = new StringContent(
                request, Encoding.UTF8,
                "application/json");
            var _appClient = new HttpClient(httpHandler);
         
                    //var response = await client.PostAsync(url, content);
                   

            if (stuff["headers"] is JObject headers)
            {
                foreach (var item in headers)
                {
                    _appClient.DefaultRequestHeaders.Add(item.Key, item.Value.ToString());

                }
            }
   

            _appClient.BaseAddress = new Uri("https://br-app-gateway.gwmcloud.com");
            string url = "app-api/api/v1.0/" + stuff["url"] as string;

            try
            {
                
                var response = await _appClient.GetAsync(url);

               
                if (response.IsSuccessStatusCode)
                {
                    
                    Console.Write(await response.Content.ReadAsStringAsync());
                }
                else
                {
                    Console.WriteLine("Erro na API: " + response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao fazer a chamada API: " + ex.Message);
            }




        }
    }
}
