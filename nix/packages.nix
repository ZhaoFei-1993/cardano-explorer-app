{ mkYarnPackage, stdenv, lib, python, nodejs }:

let
  src = lib.cleanSourceWith {
    filter = lib.cleanSourceFilter;
    src = lib.cleanSourceWith {
      filter = name: type:
        !( lib.hasSuffix ".nix" name
        || (type == "directory" && (baseNameOf name) == "node_modules" )
        || (type == "directory" && (baseNameOf name) == "generated" ))
        ;
      src = ../.;
    };
  };
in {
  cardano-explorer-app = mkYarnPackage {
    pname = "cardano-explorer-app";
    name = "cardano-explorer-app";
    version = "0.1.0";
    packageJSON = ../package.json;
    yarnLock = ../yarn.lock;
    # NOTE: If you get "Can't make a request in offline mode", check this out:
    # https://github.com/moretea/yarn2nix/issues/111
    yarnNix = ../yarn.nix;
    src = src;
    yarnPreBuild = ''
      mkdir -p $HOME/.node-gyp/${nodejs.version}
      echo 9 > $HOME/.node-gyp/${nodejs.version}/installVersion
      ln -sfv ${nodejs}/include $HOME/.node-gyp/${nodejs.version}
    '';
    pkgConfig = {
      node-sass = {
        buildInputs = [ python ];
        postInstall = ''
          yarn --offline run build
        '';
      };
    };
    CARDANO_ERA = "byron";
    CARDANO_NETWORK = "testnet";
    GRAPHQL_API_PROTOCOL = "https";
    GRAPHQL_API_HOST = "explorer.staging-shelley.aws.iohkdev.io";
    GRAPHQL_PORT = "443";

    installPhase = ''
      mkdir -p deps/cardano-explorer-app/generated/typings
      cp ${./graphql-schema.d.ts} deps/cardano-explorer-app/generated/typings/graphql-schema.d.ts
      echo "Building for host $GRAPHQL_API_HOST"
      yarn run build source
    '';

    distPhase = ''
      yarn run next export source --outdir $out
    '';

  };
}
