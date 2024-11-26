import ApiRequest from "../../api/ApiRequest";

export default function Home() {
  ApiRequest.get("/")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  return (
    <div className="flex flex-col gap-5  mt-14">
      {/* 
        @if ($posts->count())
            @foreach ($posts as $post)
                <x-post :post="$post" />
            @endforeach
        @endif */}
    </div>
  );
}
