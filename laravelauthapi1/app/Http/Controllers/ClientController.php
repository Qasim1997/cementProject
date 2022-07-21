<?php

namespace App\Http\Controllers;

use App\Models\client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return client::all();

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request){
        $request->validate([
            'name'=>'required',
            'product'=>'required',
            'address'=>'required',


        ]);


        $user = client::create([
            'name'=>$request->name,
            'product'=>$request->product,
            'address'=>$request->address,
        ]);

        return response([
            'message' => 'Product add Successfully',
            'status'=>'success'
        ], 201);
}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(client $client , $id)
    {
        return client::find($id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\client  $client
     * @return \Illuminate\Http\Response
     */

        public function update(Request $request, $id)
        {

            $student = client::find($id);
            Log::channel('stderr')->info($student->id);
            if ($student->id ==$id) {
                $student->update($request->all());
                return response([
                     'data' =>$student,
                    'message' => 'Customer add Successfully',
                    'status'=>'success'
                ], 201);            }
                else {
                    return response([
                       'message' => 'Data is not Updated',
                       'status'=>'failed'
                   ], 401);

            }




        }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = client::find($id)->delete();
        return response([
            'data' =>$student,
           'message' => 'Product delete Successfully',
           'status'=>'success'
       ], 201);

    }
}
