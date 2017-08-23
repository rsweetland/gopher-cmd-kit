# FollowUpThen Extension Starter Kit

To install, ```npm install```, then ```sls offline start```. The app
should be available on ```127.0.0.1:3000``` (or ```localhost:3000```).

## Testing Webhooks
After your extension is running, fire up [ngrok](ngrok.io) to give your local
extension a publicly accessible URL. ```ngrok http 127.0.0.1:3000``` Copy and paste the publicly accessible endpoints into your extensions admin page for the extension you're building, listed on the [extensions page](https://www.followupthen.com/settings/developer_portal).

# onCommand webhook test data example
```json
    {
        "followup": {
            "extension": {
                "private_data": {
                    "google_calendar_access_token": "ya29.GlyYBJ-thNj2sIXCTLD8dvs8sBUNJdvgzHvCI-GCslhyDt1183-JVkcOb91fflA95Oq7qc6j_iwUg_I3Y5_Xr4KNdsdfpVTFKzkUhDy40Zdsass5yAP_9Fjc-jsFJS0Qtryfk8D7XGnw"
                },
                "command": {
                    "flag": "gcalj",
                    "params": [
                        "3days",
                        "me"
                    ]
                },
                "source": {
                    "subject": {
                    }
                }
            }
        }
    }
```

## Deploying
First, install the [AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) and set up your AWS credentials if you haven't done so already. Here is a [video walkthrough](https://www.youtube.com/watch?v=HSd9uYj2LJA).

Once set up, run `sls deploy --stage prod`. After a few minutes, this will return publicly accessible endpoints for your webhooks. 

At this point, you can replace the webhook endpoints in your existing extension on the Developer Portal, or you can (preferably) create a new extension dedicated for your live production-facing version. This will give you two extensions: One dev copy (pointing to your localhost), one production copy (pointing to your live endpoints).

