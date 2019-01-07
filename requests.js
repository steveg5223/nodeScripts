var
  num_requests = 0,
  empty_req = 0,
  accum = [
    {
      pattern: '/status',
      regex: /\/status/,
      count: 0
    },
    {
      pattern: '/api/2/<org_snode_id>/rest/pm/runtime/update',
      regex: /\/api\/2\/([a-z0-9]{24})\/rest\/pm\/runtime\/update/,
      count: 0,
      print: true
    },
    {
      pattern: '/api/2/<org_snode_id>/rest/pm/runtime/<runtime_id>',
      regex: /\/api\/2\/([a-z0-9]{24})\/rest\/pm\/runtime/,
      count: 0,
      print: true
    },
    {
      pattern: '/api/2/<org_snode_id>/rest/client/logs',
      regex: /\/api\/2\/([a-z0-9]{24})\/rest\/client\/logs/,
      count: 0
    },
    {
      pattern: '/api/2/<org_snode_id>/rest/audit',
      regex: /\/api\/2\/([a-z0-9]{24})\/rest\/audit/,
      count: 0
    },
    {
      pattern: '/api/2/<org_snode_id>/rest/motd',
      regex: /\/api\/2\/([a-z0-9]{24})\/rest\/motd/,
      count: 0
    },
    {
      pattern: '/api/2/<org_snode_id>/rest/pipeline',
      regex: /\/api\/2\/([a-z0-9]{24})\/rest\/pipeline/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/org/<org_snode>/whitelist',
      regex: /\/api\/1\/rest\/admin\/org\/([a-z0-9]{24})\/whitelist/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/org/<org_snode>',
      regex: /\/api\/1\/rest\/admin\/org\/([a-z0-9]{24})/,
      count: 0
    },
    {
      pattern: '/api/1/rest/cc/initialize/',
      regex: /\/api\/1\/rest\/cc\/initialize/,
      count: 0
    },
    {
      pattern: '/api/1/rest/ccproxy/ws/',
      regex: /\/api\/1\/rest\/ccproxy\/ws/,
      count: 0
    },
    {
      pattern: '/api/1/rest/cc/configuration/',
      regex: /\/api\/1\/rest\/cc\/configuration/,
      count: 0
    },
    {
      pattern: '/api/1/rest/cc/heartbeat/<cc_snode_id>/',
      regex: /\/api\/1\/rest\/cc\/heartbeat\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/cp/heartbeat/<cc_snode_id>/',
      regex: /\/api\/1\/rest\/cp\/heartbeat\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/cc/<cc_snode_id>/',
      regex: /\/api\/1\/rest\/cc\/([a-z0-9]{24})/,
      count: 0
    },
    {
      pattern: '/api/1/rest/cc/<cc_snode_id>/',
      regex: /\/api\/1\/rest\/cc\?(.?)/,
      count: 0
    },
    {
      pattern: '/api/1/rest/pipeline/link/<pipe_snode_id>/',
      regex: /\/api\/1\/rest\/pipeline\/link\/([a-z0-9]{24})/,
      count: 0
    },
    {
      pattern: '/api/1/rest/slsched/queues/<org_name>/rt/<location>/<environment>/',
      regex: /\/api\/1\/rest\/slsched\/queues\/([a-zA-Z0-9]+)\/rt\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)/,
      count: 0
    },
    {
      pattern: '/api/1/rest/slsched/prepare/<task_snode_id>/',
      regex: /\/api\/1\/rest\/slsched\/prepare\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/slsched/job/<task_snode_id>',
      regex: /\/api\/1\/rest\/slsched\/job\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/pipeline/prepare/<pipe_snode_id>',
      regex: /\/api\/1\/rest\/pipeline\/prepare\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/pipeline/stop/<runtime_id>',
      regex: /\/api\/1\/rest\/pipeline\/stop\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/pipeline/<pipe_snode_id>',
      regex: /\/api\/1\/rest\/pipeline\/([a-z0-9]{24})/,
      count: 0
    },
    {
      pattern: '/api/1/rest/pipeline/',
      regex: /\/api\/1\/rest\/pipeline/,
      count: 0
    },
    {
      pattern: '/api/1/rest/audit/',
      regex: /\/api\/1\/rest\/audit/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/oauth2callback/rest/',
      regex: /\/api\/1\/rest\/admin\/oauth2callback\/rest/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/sso/login/',
      regex: /\/api\/1\/rest\/admin\/sso\/login/,
      count: 0
    },
    {
      pattern: '/api/1/rest/index/',
      regex: /\/api\/1\/rest\/index/,
      count: 0
    },
    {
      pattern: '/api/1/rest/slfs/<file_path>/',
      regex: /\/api\/1\/rest\/slfs\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/list/<asset_path>/',
      regex: /\/api\/1\/rest\/asset\/list\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/user/<username>/',
      regex: /\/api\/1\/rest\/asset\/user\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/org/<org-phases>/',
      regex: /\/api\/2\/([a-z0-9]{24})\/rest\/asset\/org-phases\?([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/tree/<orgname>/',
      regex: /\/api\/1\/rest\/asset\/tree\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/group/<groupname>/',
      regex: /\/api\/1\/rest\/asset\/group\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/session/<sessionID>/',
      regex: /\/api\/1\/rest\/asset\/session\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/<asset_path>/',
      regex: /\/api\/1\/rest\/asset\/\?(.+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/asset/<asset_path>/',
      regex: /\/api\/1\/rest\/asset/,
      count: 0
    },
    {
      pattern: '/api/1/rest/schema/fetch/<schema_class_fqid>/',
      regex: /\/api\/1\/rest\/schema\/fetch\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/plex/org/<org_name>/',
      regex: /\/api\/1\/rest\/plex\/org\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/plex/<plex_name>/',
      regex: /\/api\/1\/rest\/plex/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/account/<account_instance_id>/',
      regex: /\/api\/1\/rest\/admin\/account\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/snappack/account/<account_class_id>/',
      regex: /\/api\/1\/rest\/admin\/snappack\/account([\w\/\?]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/snappack/snap/<snap_class_id>/',
      regex: /\/api\/1\/rest\/admin\/snappack\/snap\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/snappack/catalog/accounts/<path_id>/',
      regex: /\/api\/1\/rest\/admin\/snappack\/catalog\/accounts(.+)/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/snappack/catalog/snaps/<path_id>/',
      regex: /\/api\/1\/rest\/admin\/snappack\/catalog\/snaps(.+)/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/snappack/resolve/<snode_id>/',
      regex: /\/api\/1\/rest\/admin\/snappack\/resolve(.+)/,
      count: 0
    },
    {
      pattern: '/api/1/rest/admin/notify/',
      regex: /\/api\/1\/rest\/admin\/notify/,
      count: 0
    },
    {
      pattern: '/api/1/rest/slserver/update_cc_metrics',
      regex: /\/api\/1\/rest\/slserver\/update_cc_metrics/,
      count: 0
    },
    {
      pattern: '/api/1/rest/cp\/list/<query_params>',
      regex: /\/api\/1\/rest\/cp\/list/,
      count: 0
    },
    {
      pattern: '/api/1/rest/public/',
      regex: /\/api\/1\/rest\/public/,
      count: 0
    },
    {
      pattern: '/public\/jcc/',
      regex: /public\/jcc/,
      count: 0
    },
    {
      pattern: '/api/1/rest/relay/<request_args>',
      regex: /\/api\/1\/rest\/relay\/([\w\/]+)+/,
      count: 0
    },
    {
      pattern: '/sl/<ui_resource>',
      regex: /\/sl/,
      count: 0
    }
  ],
  fs = require('fs'),
  filename = 'sumo_combo.csv',
  lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(filename)
});

lineReader.on('line', function (line) {
  if (line.length > 2) {
    num_requests++;
    const found_pattern = accum.find(function (elem) {
      if (elem.regex.test(line)) {
        if (elem.print) {
//          console.log(elem.regex.exec(line));
        }
        return true;
      }
    });
    if (found_pattern) {
      found_pattern.count++;
      return;
    }
    else {
    //  console.log(`URL: ${line} not found`);
    }
  }
  empty_req++;
  return;
}).on('close', (input) => {
  let index, this_url, frequency;
  const url_types = Object.keys(accum.sort(function (a, b) {return b.count - a.count;}));
  console.log('end of input # records = ' + num_requests);
  for (index = 0; index < url_types.length; index++) {
    this_url = accum[url_types[index]];
    //console.log(`${this_url.pattern} occurred ${this_url.count} out of ${num_requests}`)
  }
  console.log(JSON.stringify(accum));
});